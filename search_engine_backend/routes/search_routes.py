from flask import Blueprint, request, jsonify, current_app 
from services.search_service import hybrid_search 
from utils.auth_utils import token_required
from models.history_model import History
from extensions import db

search_bp = Blueprint("search", __name__) 

@search_bp.route('/search', methods=['POST', 'OPTIONS'], strict_slashes=False)
@token_required
def search(current_user): 
    current_app.logger.info(
        f"Requête reçue à l'endpoint /search (fonction 'search'). Méthode: {request.method}, Chemin: {request.path}"
    )

    if request.method == 'OPTIONS':
        return jsonify({}), 200

    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Données JSON manquantes ou Content-Type incorrect."}), 400
        
        query = data.get("query", "") 
        if not query.strip(): 
            return jsonify({"error": "Le champ 'query' est vide ou manquant."}), 400
        
        # ✅ Ajouter l'entrée dans l'historique
        history_entry = History(user_id=current_user.id, query=query.strip())
        db.session.add(history_entry)
        db.session.commit()

        results = hybrid_search(query) 
        return jsonify({"results": results})
    
    except Exception as e:
        return jsonify({"error": "Une erreur interne du serveur est survenue lors de la recherche."}), 500
