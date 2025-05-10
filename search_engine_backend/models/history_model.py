from extensions import db
from datetime import datetime

class History(db.Model):
    __tablename__ = 'search_history'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', name='fk_history_user_id'), nullable=False)
    query = db.Column(db.String(300), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    user = db.relationship('User', backref=db.backref('history_entries', lazy='dynamic'))

    def __repr__(self):
        return f'<History id={self.id} user_id={self.user_id} query="{self.query[:30]}...">'

    def to_dict(self):
        return {
            'id': self.id,
            'query': self.query,
            'timestamp': self.timestamp.isoformat() if self.timestamp else None
        }