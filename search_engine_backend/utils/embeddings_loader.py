import pickle
import os

def load_embeddings():
    # Accès au dossier index/ situé à la racine du projet
    path = os.path.join("..", "index", "context_embeddings.pkl")
    with open(path, "rb") as f:
        embeddings, texts = pickle.load(f)
    return embeddings, texts
