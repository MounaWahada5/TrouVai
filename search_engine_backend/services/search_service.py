from sentence_transformers import SentenceTransformer # type: ignore
from sklearn.metrics.pairwise import cosine_similarity # type: ignore
from utils.embeddings_loader import load_embeddings # type: ignore

model = SentenceTransformer("all-MiniLM-L6-v2")
embeddings, texts = load_embeddings()

def search_query(query, top_k=5):
    query_vec = model.encode([query])
    sims = cosine_similarity(query_vec, embeddings)[0]
    top_indices = sims.argsort()[-top_k:][::-1]
    return [{"text": texts[i], "score": float(sims[i])} for i in top_indices]
