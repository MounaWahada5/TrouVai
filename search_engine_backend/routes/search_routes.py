from flask import Blueprint, request, jsonify
from services.search_service import search_query

search_bp = Blueprint("search", __name__)

@search_bp.route("/search", methods=["POST"])
def search():
    try:
        data = request.get_json()
        query = data.get("query", "")
        if not query:
            return jsonify({"error": "Aucune requête fournie."}), 400

        results = search_query(query)
        return jsonify(results)

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
