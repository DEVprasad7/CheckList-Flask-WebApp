import React from "react";

const TasksList = ({ tasks, updateTask, updateCallback }) => {
  const onDelete = async (id) => {
    try {
      const options = {
        method: "DELETE",
      };
      const response = await fetch(
        `http://127.0.0.1:5000/delete_task/${id}`,
        options
      );
      if (response.status === 200) {
        updateCallback();
      } else {
        alert("Failed To Delete");
      }
    } catch (error) {
      alert(error);
    }
  };

  const taskDone = async (id) => {
    try {
      const data = {
        completed: true,
      };

      const options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(
        `http://127.0.0.1:5000/mark_task/${id}`,
        options
      );

      if (response.ok) {
        updateCallback();

        console.log(`Task ${id} marked as completed successfully`);
      } else {
        const errorData = await response.json();
        const errorMessage =
          errorData.message ||
          `Failed to mark task as completed. Status: ${response.status}`;
        alert(errorMessage);
        console.error("Error marking task as completed:", errorData);
      }
    } catch (error) {
      console.error("Network error or exception:", error);
      alert(
        "Failed to mark task as completed. Please check your connection and try again."
      );
    }
  };

  return (
    <div>
      <h2>Tasks</h2>
      <table>
        <thead>
          <tr>
            <th>Tasks</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              className={task.completed ? "completed-task" : ""}
            >
              <td>{task.task_name}</td>
              <td>
                <span
                  className={`priority-tag priority-${task.priority.toLowerCase()}`}
                >
                  {task.priority}
                </span>
              </td>
              <td>
                <button
                  className="mark-btn"
                  onClick={() => taskDone(task.id)}
                  disabled={task.completed}
                >
                 ✅ Done!
                </button>
                <button
                  className="modify-btn"
                  onClick={() => updateTask(task)}
                  disabled={task.completed}
                >
                 🖋️ Modify
                </button>
                <button
                  className="delete-btn"
                  onClick={() => onDelete(task.id)}
                >
                 🗑️ Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TasksList;
