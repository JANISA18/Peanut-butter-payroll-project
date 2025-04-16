Written by Janice Nsunzu

*Peanut butter payroll system*

This is a full-stack Employee Information Management System built with:

- Frontend: React (TypeScript)
- Backend: Node.js, Express, MySQL
- Database: MySQL
- CI/CD Automation: Jenkins
- Hosting (Frontend): Vercel
- Local Deployment: Local web server via Jenkins




Folder Structure
project-root/ 
├── backend/ 
|── frontend/


*Project Setup Instructions for backend and frontend below*


Backend Setup
- Navigate to the backend folder
- Install dependencies: npm install
- .env file (if it does not appear)
  put the following inside: 
DB_HOST=localhost
DB_USER=root
DB_PASSWORD="e*C$a*6A7Q"
DB_NAME=employee_db
PORT=5000
REACT_APP_API_BASE_URL=http://localhost:5000


- To start backend Node sever: node index.js
- PS. The backend server should run on http://localhost:5000



Frontend Setup
- Navigate to the frontend folder
- Install dependencies: npm install
- Start frontend app: npm start
- The app runs on http://localhost:3000


For a Live Demo of the Frontend (Vercel) go to: https://your-vercel-project.vercel.app

Backend: Runs locally via Jenkins.

Features of the system
Add, update, delete, fetch employees (CRUD Functionality)
Select gender, profile colors
Enter gross salary
RESTful API with database persistence


By: Janicesunzu@gmail.com