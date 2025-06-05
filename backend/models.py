from config import db

class CheckList(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task_name = db.Column(db.String(200), nullable=False)
    priority = db.Column(db.String(50), nullable=False)
    completed = db.Column(db.Boolean, default=False)


    def to_json(self):
        return {
            "id": self.id,
            "task_name": self.task_name,
            "priority": self.priority,
            "completed": self.completed,
        }