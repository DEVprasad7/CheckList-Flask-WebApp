from flask import request, jsonify
from config import app, db
from models import CheckList


@app.route("/tasks", methods=["GET"])
def get_tasks():
    tasks = CheckList.query.all()
    json_tasks = list(map(lambda x: x.to_json(), tasks))
    return jsonify({"tasks": json_tasks})


@app.route("/new_task", methods=["POST"])
def create_task():
    task_name = request.json.get("task_name")
    priority = request.json.get("priority")
    

    if not task_name or not priority:
        return (
            jsonify({"message": "You must include all the entries"}),
            400,
        )

    new_task = CheckList(task_name=task_name, priority=priority)
    try:
        db.session.add(new_task)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "Task added!"}), 201


@app.route("/update_task/<int:task_id>", methods=["PATCH"])
def update_task(task_id):
    task = CheckList.query.get(task_id)

    if not task:
        return jsonify({"message": "task not found"}), 404

    data = request.json
    task.task_name = data.get("task_name", task.task_name)
    task.priority = data.get("priority", task.priority)
    if not task.task_name or not task.priority:
        return (
            jsonify({"message": "You must include all the entries"}),
            400,
        )
    db.session.commit()

    return jsonify({"message": "Task updated."}), 200


@app.route("/delete_task/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    task = CheckList.query.get(task_id)

    if not task:
        return jsonify({"message": "Task not found"}), 404

    
    db.session.delete(task)
    db.session.commit()

    return jsonify({"message": "Task removed!"}), 200

@app.route("/mark_task/<int:task_id>", methods=["PATCH"])
def mark_task(task_id):
    task = CheckList.query.get(task_id)

    if not task:
        return jsonify({"message": "Task not found"}), 404

    data = request.json
    task.completed = data.get("completed", task.completed)
    db.session.commit()

    return jsonify({"message": "Task marked as completed."}), 200


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)