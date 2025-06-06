import React from 'react'

const TasksList = ({tasks, updateTask, updateCallback}) => {
    const onDelete = async (id) => {
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch(`http://127.0.0.1:5000/delete_task/${id}`, options)
            if (response.status === 200) {
                updateCallback()
            } else {
                alert("Failed To Delete")
            }
        } catch (error) {
            alert(error)
        }
    }

    // const updating = Object.entries(existingTask).length !== 0
    const taskDone = async (id) => {
        try {
            // Prepare the data to send
            const data = {
                completed: true // Include task_id in the payload
            }
            
            // API call configuration
            const options = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
            
            // Make the API call to mark task as completed
            // Option 1: If Flask route expects ID in URL
            const response = await fetch(`http://127.0.0.1:5000/mark_task/${id}`, options)
            
            // Option 2: If Flask route expects ID in request body (use the original line above)
            
            // Check if the request was successful
            if (response.ok) {  // response.ok checks for status 200-299
                // Update the local state to reflect the change
                
                // Refresh the tasks list by calling the parent callback
                updateCallback()
                
                // Optional: Show success message
                console.log(`Task ${id} marked as completed successfully`)
                
            } else {
                // Handle HTTP error responses
                const errorData = await response.json()
                const errorMessage = errorData.message || `Failed to mark task as completed. Status: ${response.status}`
                alert(errorMessage)
                console.error("Error marking task as completed:", errorData)
            }
            
        } catch (error) {
            // Handle network errors or other exceptions
            console.error("Network error or exception:", error)
            alert("Failed to mark task as completed. Please check your connection and try again.")
        }
    }

    return <div>
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
                    <tr key={task.id}>
                        <td>{task.task_name}</td>
                        <td>{task.priority}</td>
                        <td>
                            <button onClick={() => taskDone(task.id)}>Task Done!</button>
                            <button onClick={() => updateTask(task)}>Modify</button>
                            <button onClick={() => onDelete(task.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>    


}

export default TasksList