
# Todo List Application

This is a full-stack Todo List application built using Angular and Tailwind CSS for the frontend, Express.js for the backend, and MongoDB for the database.

## Features

- Assign tasks to users with a due date and priority (Low, Normal, High)
- Track tasks by status (Not Started, In Progress, Completed)
- Create, edit, and delete tasks
- Search tasks by name using the search box
- Modal for creating new tasks

## Tech Stack

### Frontend:
- **Angular**: Used for building the UI of the application.
- **Tailwind CSS**: Used for styling the components in a responsive and modern design.

### Backend:
- **Express.js**: Used for handling API requests and communicating with the database.
- **MongoDB**: Used as the database to store task data.

## Installation and Setup

### Prerequisites:
- Node.js
- Angular CLI
- MongoDB

### Backend Setup:
1. Navigate to the backend folder.
2. Install dependencies:
   **npm install**
3. Start the backend server:
   **nodemon server.js**
4. Backend server will run on `http://localhost:3000`.

### Frontend Setup:
1. Navigate to the frontend folder.
2. Install Angular dependencies:
   **npm install**
3. Run the Angular development server:
   **ng serve**
4. Frontend server will run on `http://localhost:4200`.

### Configuration
Create a .env file in the backend folder and add the MongoDB connection URL
**MongoDbURI=mongodb://<username>:<password>@localhost:27017/<database_name>**

## Usage

- Open the application at `http://localhost:4200`.
- Use the "Create Task" button to add a new task. This will open a modal where you can enter the task details, including the user, due date, priority, and status.
- Edit or delete existing tasks from the task list.
- Use the search box to quickly find tasks by name.

**Dashboard**
![image](https://github.com/user-attachments/assets/28bfbc60-8ba5-428c-9a5d-3f397bee2056)

**New Task Modal Form**
![image](https://github.com/user-attachments/assets/fcae28ee-3ec9-4e72-92cb-d963df2173cc)

**After Submiting the Form**
![image](https://github.com/user-attachments/assets/3356c8fa-378d-44f0-abe4-61ebee7e4a4a)
