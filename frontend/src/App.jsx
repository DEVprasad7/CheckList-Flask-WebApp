import { useState, useEffect } from 'react'
import TasksList from './components/TasksList'
import TaskForm from './components/TaskForm'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentTask, setCurrentTask] = useState({})

  useEffect(() => {
    fetchTasks()
  }, []);
  
  const fetchTasks = async () => {
    const response = await fetch("http://127.0.0.1:5000/tasks")
    const data = await response.json()
    setTasks(data.tasks)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentTask({})
  }

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  const openEditModal = (task) => {
    if (isModalOpen) return
    setCurrentTask(task)
    setIsModalOpen(true)
  }

  const onUpdate = () => {
    closeModal()
    fetchTasks()
  }

  // const markDone = () => {
  //   fetchTasks()
  // }


  return (
    <>
      <h1>List Of Tasks</h1>
      <TasksList tasks={tasks} updateTask={openEditModal} updateCallback={onUpdate} />
      <button className="create-btn" onClick={openCreateModal}>➕ Add Task</button>
      {isModalOpen && <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <TaskForm existingTask={currentTask} updateCallback={onUpdate} />
        </div>
      </div>
      }
    </>
  );
}

export default App;
