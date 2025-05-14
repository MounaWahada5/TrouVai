import requests

def generate_answer_with_llm(contexts, query, history=None):
    """
    Génére une réponse basée sur le contexte donné et, si disponible, l'historique de la conversation.

    :param contexts: Liste de documents à utiliser comme contexte.
    :param query: La question posée par l'utilisateur.
    :param history: L'historique de la conversation, s'il existe.
    :return: Réponse générée par le LLM.
    """
    prompt = "Tu es un moteur de réponse intelligent. Réponds en langage naturel avec précision, en te basant sur les extraits suivants.\n"
    
    if history:
        prompt += "\nVoici l'historique de la conversation :\n"
        for i, turn in enumerate(history, 1):
            prompt += f"[Utilisateur {i}]: {turn['user']}\n[Assistant {i}]: {turn['bot']}\n"

    prompt += f"\nNouvelle question : {query}\n\n"
    prompt += "Contexte :\n"
    
    for i, doc in enumerate(contexts, 1):
        prompt += f"[Document {i}]\n{doc['text']}\n\n"
    
    prompt += "Réponse :"

    try:
        response = requests.post(
            "http://localhost:11434/api/generate",  # Assurez-vous que l'API de l'IA est bien disponible à ce port.
            json={
                "model": "mistral",  # Ou le modèle que vous utilisez.
                "prompt": prompt,
                "stream": False
            },
            timeout=30
        )
        response.raise_for_status()  # Vérifie si la réponse est correcte.
        return response.json().get("response", "").strip()
    except requests.exceptions.RequestException as e:
        print("Erreur lors de la génération avec Ollama :", e)
        return "Je suis désolé, je n’ai pas pu générer de réponse pour le moment."
