import json
import pickle
import pandas as pd # type: ignore
from sentence_transformers import SentenceTransformer # type: ignore

# Charger le modèle d'embedding
model = SentenceTransformer("all-MiniLM-L6-v2")

# Charger les données SQuAD
df = pd.read_csv("data/squad_train.csv")

# Vérifier les colonnes disponibles
print("Colonnes disponibles dans le CSV :", df.columns.tolist())

# Supposons que la colonne "context" contient les paragraphes
if "context" not in df.columns:
    raise ValueError("❌ La colonne 'context' n'existe pas dans le fichier CSV.")

# Supprimer les doublons + lignes vides
texts = df["context"].dropna().drop_duplicates().tolist()

# Afficher combien de paragraphes sont traités
print(f"✅ Nombre de paragraphes extraits : {len(texts)}")

# Encoder les paragraphes
print("🔄 Encodage en cours...")
embeddings = model.encode(texts, show_progress_bar=True)

# Sauvegarder les embeddings et les textes associés
with open("index/context_embeddings.pkl", "wb") as f:
    pickle.dump((embeddings, texts), f)

print("✅ Embeddings sauvegardés dans index/context_embeddings.pkl")
