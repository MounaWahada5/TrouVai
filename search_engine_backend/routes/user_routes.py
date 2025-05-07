from flask import Blueprint, request, jsonify
from models import db
from models.history_model import History
from models.favorite_model import Favorite
from utils.auth_utils import token_required

user_bp = Blueprint("user", __name__)

@user_bp.route('/history', methods=['GET'])
@token_required
def get_history(current_user):
    history = History.query.filter_by(user_id=current_user.id).all()
    return jsonify({"history": [h.query for h in history]})

@user_bp.route('/favorites', methods=['GET'])
@token_required
def get_favorites(current_user):
    favs = Favorite.query.filter_by(user_id=current_user.id).all()
    return jsonify({"favorites": [f.content for f in favs]})
