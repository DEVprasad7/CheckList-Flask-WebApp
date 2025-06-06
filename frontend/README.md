# CheckList-Flask-React-Webapp

A modern task management web application built with React frontend and Flask backend. This application allows users to create, manage, and track their tasks with priority levels and completion status.

## Features

- Create new tasks with priority levels (High, Normal, Low)
- Color-coded priority indicators
- Mark tasks as completed
- Modify existing tasks
- Delete tasks
- Responsive user interface
- Visual feedback for task status

## Tech Stack

### Frontend

- React.js
- CSS3
- Modern JavaScript (ES6+)

### Backend

- Flask (Python)
- SQLAlchemy
- SQLite Database
- Flask-CORS

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install required Python packages:

```bash
pip install flask flask-sqlalchemy flask-cors
```

3. Run the Flask server:

```bash
python main.py
```

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

## Usage

- **Adding Tasks**: Click the "Add Task" button and fill in the task details
- **Setting Priority**: Choose between High (Red), Normal (Blue), or Low (Green)
- **Marking Complete**: Click the "Done!" button to mark a task as completed
- **Modifying Tasks**: Click "Modify" to edit existing tasks
- **Deleting Tasks**: Click "Remove" to delete tasks

## Project Structure

```
CheckList-Flask-WebApp/
├── backend/
│   ├── config.py
│   ├── models.py
│   └── main.py
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── TaskForm.jsx
    │   │   └── TasksList.jsx
    │   ├── App.jsx
    │   └── App.css
    └── README.md
```

## Future Enhancements

- User authentication
- Task categories
- Due dates
- Task filtering and sorting
- Dark mode theme
- Mobile app version
