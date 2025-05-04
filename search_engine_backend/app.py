from flask import Flask
from flask_cors import CORS
from routes.search_routes import search_bp

app = Flask(__name__)
CORS(app)

# Enregistrement du blueprint
app.register_blueprint(search_bp)

if __name__ == '__main__':
    app.run(debug=True)
