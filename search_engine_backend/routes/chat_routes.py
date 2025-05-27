from flask import Blueprint, request, jsonify, current_app
from services.search_service import hybrid_search
from utils.message_filter import analyze_message  # ✅ remplacer par la nouvelle fonction
import re

chat_bp = Blueprint("chat", __name__)

def format_answer_for_readability(text):
    """
    Structure proprement la réponse du LLM pour une meilleure lisibilité.
    """
    text = text.replace("\\n", "\n").replace("\r", "").strip()
    text = re.sub(r"(Je comprends mieux.*?exemples :) *\n*", r"\1\n\n", text, flags=re.IGNORECASE)

    lines = text.splitlines()
    numbered = []
    count = 1
    for line in lines:
        line = line.strip()
        if line.startswith("*"):
            content = line.lstrip("*").strip()
            numbered.append(f"{count}. {content}")
            count += 1
        else:
            numbered.append(line)

    text = "\n".join(numbered)

    text = re.sub(
        r"^Je comprends mieux.*?Voici quelques-uns des exemples :",
        "📊 **Taux de chômage les plus bas dans certains pays :**",
        text,
        flags=re.IGNORECASE
    )

    return text.strip()

@chat_bp.route('/chat', methods=['POST', 'OPTIONS'])
def chat():
    if request.method == 'OPTIONS':
        return jsonify({}), 200

    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Requête JSON manquante"}), 400

        query = data.get("query", "").strip()
        user_id = data.get("user_id", "").strip()

        if not query:
            return jsonify({"error": "Le champ 'query' est requis"}), 400
        if not user_id:
            return jsonify({"error": "Le champ 'user_id' est requis"}), 400

        current_app.logger.info(f"[Chat] Query: {query} | User ID: {user_id}")

        # ✅ Analyser le message
        analysis = analyze_message(query)

        greeting = analysis.get("greeting")
        is_technical = analysis.get("is_technical")

        if not is_technical:
            # Répondre poliment même si ce n'est pas technique
            polite_response = greeting if greeting else "Salut ! Je suis là pour répondre à tes questions 🤗"
            return jsonify({
                "answer": polite_response + "\n\nPose-moi une question si tu veux que je t’aide davantage ! 😊",
                "sources": []
            }), 200

        # ✅ Traitement technique via LLM + Web
        result = hybrid_search(query=query, user_id=user_id)
        formatted_answer = format_answer_for_readability(result["answer"])

        # Ajouter un mot de salutation si présent
        if greeting:
            formatted_answer = f"{greeting} ! 😊\n\n{formatted_answer}"

        final_result = {
            "answer": formatted_answer,
            "sources": result.get("sources", [])
        }

        return jsonify(final_result), 200

    except Exception as e:
        current_app.logger.error(f"Erreur dans /chat : {e}")
        return jsonify({"error": "Une erreur interne est survenue."}), 500
