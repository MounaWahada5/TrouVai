from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # autorise les requêtes entre React (localhost:3000) et Flask (localhost:5000)

# Stockage simulé de l'historique
search_history = []

@app.route('/search')
def search():
    query = request.args.get('q', '')
    
    # On ajoute la recherche à l'historique
    if query:
        search_history.append(query)

    # Résultats simulés — à remplacer par un vrai moteur plus tard
    results = [
        {"title": f"Résultat trouvé pour : {query}"},
        {"title": f"Autre résultat intéressant pour : {query}"}
    ]
    return jsonify({"results": results})

# Nouvelle route : renvoie l'historique
@app.route('/history')
def history():
    return jsonify({"history": search_history})

if __name__ == '__main__':
    app.run(debug=True)
