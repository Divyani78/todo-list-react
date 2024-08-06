# ToDo List React Application

This project is a simple ToDo list application built using React.

## System Design Overview

The ToDo list application is designed as a single-page web application using React, a popular JavaScript library for building user interfaces. It follows a component-based architecture where different aspects of the UI (like task input, task list, and task items) are broken down into reusable components.

## Implementation Details

The main components of the application include:
- *App*: The root component that manages the overall state of tasks.
- *TaskForm*: Component for adding new tasks.
- *TaskList*: Component to display the list of tasks.
- *TaskItem*: Component representing individual tasks with options to mark as done or delete.

The application uses local state management within React components to handle tasks. It also employs React hooks (such as useState and useEffect) for managing component state and lifecycle events.

## Setup Instructions

To set up and run the application locally, follow these steps:

1. *Clone the repository:*

   ```bash
   git clone https://github.com/your/repository.git
   cd repository-name
2. Install dependencies
   npm install
3. Run the application
   npm start
