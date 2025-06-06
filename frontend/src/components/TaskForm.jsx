import { useState } from "react";

const TaskForm = ({ existingTask = {}, updateCallback }) => {
  const [task_name, settask_name] = useState(existingTask.task_name || "");
  const [priority, setPriority] = useState(existingTask.priority || "");

  const updating = Object.entries(existingTask).length !== 0;

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      task_name,
      priority,
    };
    const url =
      "http://127.0.0.1:5000/" +
      (updating ? `update_task/${existingTask.id}` : "new_task");
    const options = {
      method: updating ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    if (response.status !== 201 && response.status !== 200) {
      const data = await response.json();
      alert(data.message);
    } else {
      updateCallback();
    }
  };

  return (
    <form onSubmit={onSubmit} className="task-form">
      <div className="form-group">
        <label htmlFor="task_name">Task Name</label>
        <input
          type="text"
          id="task_name"
          value={task_name}
          onChange={(e) => settask_name(e.target.value)}
          placeholder="Enter your task"
        />
      </div>
      <div className="form-group">
        <label>Priority Level</label>
        <div className="priority-options">
          <div>
            <input
              type="radio"
              id="high"
              name="priority"
              value="High"
              checked={priority === "High"}
              onChange={(e) => setPriority(e.target.value)}
              className="priority-radio"
            />
            <label htmlFor="high" className="priority-label high">
              High
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="normal"
              name="priority"
              value="Normal"
              checked={priority === "Normal"}
              onChange={(e) => setPriority(e.target.value)}
              className="priority-radio"
            />
            <label htmlFor="normal" className="priority-label normal">
              Normal
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="low"
              name="priority"
              value="Low"
              checked={priority === "Low"}
              onChange={(e) => setPriority(e.target.value)}
              className="priority-radio"
            />
            <label htmlFor="low" className="priority-label low">
              Low
            </label>
          </div>
        </div>
      </div>
      <button className="submit-btn" type="submit">
        {updating ? "Update Task" : "Create Task"}
      </button>
    </form>
  );
};

export default TaskForm;
