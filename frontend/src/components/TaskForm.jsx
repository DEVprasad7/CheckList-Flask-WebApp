import { useState } from "react";

const TaskForm = ({ existingTask = {}, updateCallback }) => {
    const [task_name, settask_name] = useState(existingTask.task_name || "");
    const [priority, setPriority] = useState(existingTask.priority || "");

    const updating = Object.entries(existingTask).length !== 0

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            task_name,
            priority
        }
        const url = "http://127.0.0.1:5000/" + (updating ? `update_task/${existingTask.id}` : "new_task")
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if (response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)
        } else {
            updateCallback()
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="task_name">Enter Task:</label>
                <input
                    type="text"
                    id="task_name"
                    value={task_name}
                    onChange={(e) => settask_name(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="priority">Priority:</label>
                <input
                    type="text"
                    id="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                />
            </div>
            <button type="submit">{updating ? "Update" : "Create"}</button>
        </form>
    );
};

export default TaskForm