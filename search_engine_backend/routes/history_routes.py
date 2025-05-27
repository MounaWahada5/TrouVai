from flask import Blueprint, request, jsonify
from extensions import db
from models.history_model import History
from datetime import datetime

history_bp = Blueprint('history', __name__)

@history_bp.route('/history/<int:user_id>', methods=['GET'])
def get_user_history(user_id):
    history_items = History.query.filter_by(user_id=user_id).order_by(History.created_at.desc()).all()
    return jsonify([
        {
            "id": item.id,
            "query": item.query,
            "result_url": item.result_url,
            "created_at": item.created_at.strftime("%Y-%m-%d %H:%M:%S")
        }
        for item in history_items
    ])

@history_bp.route('/history/<int:history_id>', methods=['PUT'])
def update_history(history_id):
    data = request.get_json()
    new_query = data.get("query")

    history_item = History.query.get_or_404(history_id)
    history_item.query = new_query
    db.session.commit()

    return jsonify({"message": "History item updated"})

@history_bp.route('/history/<int:history_id>', methods=['DELETE'])
def delete_history(history_id):
    history_item = History.query.get_or_404(history_id)
    db.session.delete(history_item)
    db.session.commit()

    return jsonify({"message": "History item deleted"})
