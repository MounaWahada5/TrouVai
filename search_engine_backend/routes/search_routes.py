

from flask import Blueprint, request, jsonify, current_app 
from services.search_service import hybrid_search 

search_bp = Blueprint("search", __name__) 
@search_bp.route('/search', methods=['POST', 'OPTIONS'], strict_slashes=False)
def search(): 
   
    current_app.logger.info(
        f"Requête reçue à l'endpoint /search (fonction 'search'). Méthode: {request.method}, Chemin: {request.path}"
    )

    
    if request.method == 'OPTIONS':
        current_app.logger.info(
            "Traitement de la requête OPTIONS pour /search. Envoi d'une réponse 200 OK."
        )
        
        return jsonify({}), 200

    
    current_app.logger.info("Traitement de la requête POST pour /search.")
    try:
        data = request.get_json()
        
        
        if not data:
            current_app.logger.warning(
                "Aucune donnée JSON n'a été reçue dans la requête POST vers /search, ou le Content-Type était incorrect."
            )
            return jsonify({"error": "Données JSON manquantes ou Content-Type incorrect."}), 400
        
        query = data.get("query", "") 
        
        
        if not query.strip(): 
            current_app.logger.warning(
                "Requête POST vers /search reçue avec un champ 'query' vide ou contenant uniquement des espaces."
            )
            return jsonify({"error": "Le champ 'query' est vide ou manquant."}), 400
        
        current_app.logger.info(f"Recherche demandée pour la requête (query): '{query}'")
        
        
        results = hybrid_search(query) 
        
        
        current_app.logger.info(f"Recherche pour '{query}' a retourné {len(results) if isinstance(results, list) else 'un type inattendu'} résultats.")
        return jsonify({"results": results})
    
    except Exception as e:
        
        query_for_log = query if 'query' in locals() and query else "non définie ou erreur avant assignation"
        current_app.logger.error(
            f"Erreur interne du serveur lors du traitement de la requête POST pour /search (query='{query_for_log}'): {str(e)}",
            exc_info=True
        )
        return jsonify({"error": "Une erreur interne du serveur est survenue lors de la recherche."}), 500