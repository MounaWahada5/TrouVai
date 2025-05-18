from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from .web_scraper import scrape_web
from .llm_answer import generate_answer_with_llm

# Chargement du modèle d'embedding
model = SentenceTransformer("all-MiniLM-L6-v2")

# Mémoire temporaire de chat
chat_memory = {}

def hybrid_search(query, user_id=None, top_k=5):
    """
    Recherche basée sur le scraping web + réponse LLM, avec mémoire utilisateur.
    """
    web_results = scrape_web(query)

    if not web_results:
        return {
            "answer": "Aucun résultat trouvé pour cette question.",
            "sources": []
        }

    texts = [doc["text"] for doc in web_results]
    query_embedding = model.encode([query])
    doc_embeddings = model.encode(texts)
    similarities = cosine_similarity(query_embedding, doc_embeddings)[0]

    for i, doc in enumerate(web_results):
        doc["score"] = float(similarities[i])
        doc["source"] = "web"

    sorted_docs = sorted(web_results, key=lambda x: x["score"], reverse=True)[:top_k]

    history = chat_memory.get(user_id, []) if user_id else []
    answer = generate_answer_with_llm(sorted_docs, query, history=history)

    if user_id:
        chat_memory.setdefault(user_id, []).append({
            "user": query,
            "bot": answer
        })

    sources = []
    for doc in sorted_docs:
        url = doc.get("url")
        if url and url not in sources:
            sources.append(url)
        if len(sources) >= 4:
            break

    return {
        "answer": answer,
        "sources": sources
    }
