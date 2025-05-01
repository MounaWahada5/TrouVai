from flask_cors import CORS # type: ignore

app = Flask(__name__) # type: ignore
CORS(app)  # autorise les requêtes depuis React
