
from flask import Flask
from flask_cors import CORS
from extensions import db, bcrypt
from routes.search_routes import search_bp
from routes.auth_routes import auth_bp
from routes.user_routes import user_bp


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

# Config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'votre_clef_secrete_super_secure'

# Init les extensions
db.init_app(app)
bcrypt.init_app(app)

# les routes
app.register_blueprint(search_bp, url_prefix="/api")
app.register_blueprint(auth_bp, url_prefix="/api/auth")



with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True, host="localhost", port=5000)
