🛠️ Custom Dashboard Builder

Description:
The Custom Dashboard Builder allows users to create personalized dashboards by combining various widgets such as Charts 📊, Tables 📋, and KPI cards 🎯. It includes a Customer Portal 👥 to manage orders and an Admin Portal 🛎️ to manage data efficiently.

✨ Features

🖱️ Create dashboards with drag-and-drop widgets.

📊 Widgets supported: Charts, Tables, KPIs.

📝 View, create, edit, and delete customer orders.

🔢 Table pagination, search, and sorting.

🔐 JWT-based authentication for secure access.

💻 Tech Stack

Frontend: React.js ⚛️, Tailwind CSS 🎨

Backend: Node.js 🟢, Express.js 🚂

Database: MongoDB 🍃 (local)

Other: Axios for API calls 📡, CORS 🌐

⚙️ Installation

Clone the repository

git clone <your-repo-link>
cd <your-project-folder>


Install dependencies

Backend

cd backend
npm install


Frontend

cd ../frontend
npm install

🗄️ Setup MongoDB

Make sure you have MongoDB installed locally and running on:

mongodb://127.0.0.1:27017/customerOrders

🚀 Run the project

Backend

cd backend
node index.js
# or
npm start


Frontend

cd ../frontend
npm start


Frontend will run on http://localhost:3000
 and backend on http://localhost:4000
.

📡 API Endpoint

/api/orders → Handle customer orders (GET, POST, PUT, DELETE).

📂 Folder Structure
backend/
  ├ models/
  │   └ Order.js
  ├ routes/
  │   └ orderRoutes.js
  ├ index.js
  └ package.json

frontend/
  ├ src/
  │   ├ components/
  │   │   ├ Configured.jsx
  │   │   ├ CreateTable.jsx
  │   │   ├ CustomerOrders.jsx
  │   │   └ Orders.jsx
  │   ├ App.js
  │   └ index.js
  └ package.json

⚡ Usage

Open the frontend at http://localhost:3000

Use the dashboard to add widgets and manage orders.

Tables support pagination and sorting (e.g., 5, 10, 15 records per page).# act
