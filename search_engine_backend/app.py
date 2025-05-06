from flask import Flask, request, jsonify
from flask_cors import CORS
from services.search_service import hybrid_search  # Import depuis le bon module

app = Flask(__name__)
CORS(app)  # Autorise les requêtes cross-origin (depuis le frontend React)

@app.route('/api/search', methods=['POST'])
def search():
    data = request.get_json()
    query = data.get('query', '')

    if not query:
        return jsonify({'error': 'Query parameter is required'}), 400

    try:
        results = hybrid_search(query)

        formatted = [
            {
                "text": r.get("text"),
                "score": round(r.get("score", 0), 3),
                "source": r.get("source"),
                "url": r.get("url", None)
            }
            for r in results
        ]

        return jsonify({"results": formatted}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
