from flask import Flask
from flask_cors import CORS
from extensions import db, bcrypt
from config import SECRET_KEY
from routes.search_routes import search_bp
from routes.auth_routes import auth_bp
from models import *

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

app.config['SECRET_KEY'] = SECRET_KEY
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
bcrypt.init_app(app)

app.register_blueprint(search_bp, url_prefix="/api/search")
app.register_blueprint(auth_bp, url_prefix="/api/auth")

if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # Crée les tables si elles n'existent pas
    app.run(debug=True)
