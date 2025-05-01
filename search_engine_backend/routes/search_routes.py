from flask import Blueprint, request, jsonify # type: ignore
from services.search_service import search_query # type: ignore

search_bp = Blueprint("search", __name__)

@search_bp.route('/search', methods=['POST'])
def search():
    data = request.get_json()
    query = data.get("query", "")
    results = search_query(query)
    return jsonify(results)
