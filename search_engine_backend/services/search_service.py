from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from .squad_search import search_squad
from .web_scraper import scrape_web
from .llm_answer import generate_answer_with_llm

# Chargement du modèle d'embedding
model = SentenceTransformer("all-MiniLM-L6-v2")

# Un dictionnaire en mémoire pour stocker l’historique par utilisateur (temporaire)
chat_memory = {}

def hybrid_search(query, user_id=None, top_k=5):
    """
    Recherche hybride + mémoire de conversation par user_id.
    """
    squad_results = search_squad(query)
    web_results = scrape_web(query)

    # Marquage des sources
    for r in squad_results:
        r["source"] = "squad"
        r["score"] = 1.0
    for r in web_results:
        r["source"] = "web"

    all_results = squad_results + web_results
    if not all_results:
        return {
            "answer": "Aucun document trouvé pour répondre à cette question.",
            "sources": []
        }

    texts = [doc["text"] for doc in all_results]
    query_embedding = model.encode([query])
    doc_embeddings = model.encode(texts)
    similarities = cosine_similarity(query_embedding, doc_embeddings)[0]

    for i, doc in enumerate(all_results):
        doc["score"] = float(similarities[i])

    sorted_docs = sorted(all_results, key=lambda x: x["score"], reverse=True)[:top_k]

    # Récupérer l'historique de ce user
    history = chat_memory.get(user_id, []) if user_id else []

    # Génération de la réponse avec historique
    answer = generate_answer_with_llm(sorted_docs, query, history=history)

    # Mise à jour de l'historique
    if user_id:
        chat_memory.setdefault(user_id, []).append({
            "user": query,
            "bot": answer
        })

    # Extraction des sources
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
