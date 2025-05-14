from flask import Blueprint, request, jsonify, current_app
from services.search_service import hybrid_search

chat_bp = Blueprint("chat", __name__)

@chat_bp.route('/chat', methods=['POST', 'OPTIONS'])
def chat():
    if request.method == 'OPTIONS':
        return jsonify({}), 200  # Pour les requêtes CORS

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

        # Appel à la recherche avec gestion de mémoire de chat
        result = hybrid_search(query=query, user_id=user_id)
        return jsonify(result), 200

    except Exception as e:
        current_app.logger.error(f"Erreur dans /chat : {e}")
        return jsonify({"error": "Une erreur interne est survenue."}), 500
