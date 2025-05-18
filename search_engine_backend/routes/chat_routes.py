from flask import Blueprint, request, jsonify, current_app
from services.search_service import hybrid_search
import re

chat_bp = Blueprint("chat", __name__)

def format_answer_for_readability(text):
    """
    Structure proprement la réponse du LLM pour une meilleure lisibilité.
    """
    # Nettoyage des retours à la ligne mal formatés
    text = text.replace("\\n", "\n").replace("\r", "").strip()

    # Espacement après les introductions
    text = re.sub(r"(Je comprends mieux.*?exemples :) *\n*", r"\1\n\n", text, flags=re.IGNORECASE)

    # Convertir les puces (*) en liste numérotée
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

    # Ajouter un titre si la phrase clé est détectée
    text = re.sub(
        r"^Je comprends mieux.*?Voici quelques-uns des exemples :",
        "📊 **Taux de chômage les plus bas dans certains pays :**",
        text,
        flags=re.IGNORECASE
    )

    # Phrase de clôture conviviale
    if "💬" not in text:
        text += "\n\n💬 Si vous souhaitez aussi connaître les pays avec les taux les plus élevés ou d'autres informations liées à l'emploi, n’hésitez pas à demander !"

    return text.strip()

@chat_bp.route('/chat', methods=['POST', 'OPTIONS'])
def chat():
    if request.method == 'OPTIONS':
        return jsonify({}), 200  # Réponse CORS

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

        # Recherche hybride (web + réponse intelligente)
        result = hybrid_search(query=query, user_id=user_id)

        # Mise en forme claire de la réponse
        formatted_answer = format_answer_for_readability(result["answer"])

        final_result = {
            "answer": formatted_answer,
            "sources": result.get("sources", [])
        }

        return jsonify(final_result), 200

    except Exception as e:
        current_app.logger.error(f"Erreur dans /chat : {e}")
        return jsonify({"error": "Une erreur interne est survenue."}), 500
