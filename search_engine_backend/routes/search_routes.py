from flask import Blueprint, request, jsonify
from services.search_service import hybrid_search

search_bp = Blueprint("search", __name__)

@search_bp.route('/', methods=['POST'])
def search():
    try:
        data = request.get_json()
        query = data.get("query", "")
        if not query:
            return jsonify({"error": "Requête vide"}), 400
        results = hybrid_search(query)
        return jsonify({"results": results})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
