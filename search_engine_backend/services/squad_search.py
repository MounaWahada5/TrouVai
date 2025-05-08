from sentence_transformers import SentenceTransformer  
from sklearn.metrics.pairwise import cosine_similarity  
import numpy as np  
from utils.embeddings_loader import load_embeddings 

model = SentenceTransformer("all-MiniLM-L6-v2")

def search_squad(query, top_k=5):
    embeddings, texts = load_embeddings()
    query_embedding = model.encode([query])
    similarities = cosine_similarity(query_embedding, embeddings)[0]
    top_k_indices = np.argsort(similarities)[::-1][:top_k]

    results = [{"text": texts[i], "score": float(similarities[i])} for i in top_k_indices]
    return results
