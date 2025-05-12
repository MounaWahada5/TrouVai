from flask import Blueprint, request, jsonify
from extensions import db
from models.feedback_model import Feedback
from utils.auth_utils import token_required

feedback_bp = Blueprint("feedback", __name__)

@feedback_bp.route("/", methods=["POST"])
@token_required
def submit_feedback(current_user):
    data = request.get_json()
    message = data.get("message")

    if not message:
        return jsonify({"error": "Le message est requis"}), 400

    feedback = Feedback(user_id=current_user.id, message=message)
    db.session.add(feedback)
    db.session.commit()

    return jsonify({"message": "Feedback envoyé avec succès"}), 201

@feedback_bp.route("/", methods=["GET"])
@token_required
def get_feedback(current_user):
    feedbacks = Feedback.query.filter_by(user_id=current_user.id).order_by(Feedback.created_at.desc()).all()
    return jsonify({
        "feedbacks": [
            {"id": f.id, "message": f.message, "timestamp": f.created_at}
            for f in feedbacks
        ]
    })
