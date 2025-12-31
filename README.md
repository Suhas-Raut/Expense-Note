<div align="center">
  
# 💰 Expense & Income Tracker
![React](https://img.shields.io/badge/Frontend-React-61DBFB?logo=react&logoColor=white)
![Node](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/API-Express.js-black?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-4EA94B?logo=mongodb&logoColor=white)
![Chart.js](https://img.shields.io/badge/Charts-Chart.js-ff6384?logo=chart.js&logoColor=white)

![Netlify Status](https://img.shields.io/badge/Hosted%20On-Netlify-00C7B7?logo=netlify&logoColor=white)
![Render Status](https://img.shields.io/badge/API%20Hosted%20On-Render-46E3B7?logo=render&logoColor=white)
</div>

> **Track your money. Understand your spending. Stay in control.**  
> A modern **Expense & Income Tracker** with charts, totals, and a clean UI — built using the MERN stack.

---

## 🚀 Live Demo  

<a href="https://expnote24.netlify.app/" target="_blank" rel="noreferrer">
  <img src="https://github.com/Suhas-Raut/Expense-Note/blob/main/frontend/public/image.svg" alt="Live" width="180" height="150"/>
</a>  

---

## ✨ Features

### 📌 Track Income & Expenses
- Add **Income**
- Add **Expenses**
- Categorize spending (Food, Shopping, Transport, etc.)
- Delete transactions anytime

### 📊 Smart Summary Cards
- 💵 **Total Income**
- 💸 **Total Expense**
- 🧾 **Remaining Balance**

(All update automatically in real-time)

### 🥧 Spending Breakdown Chart
- Colorful **doughnut chart**
- Breakdown by category
- Built using **Chart.js**

### 🎨 Modern UI
- Glassmorphism styling
- Clean card layout
- Responsive across devices

---

## 🖼️ Screenshots 

- Dashboard  
- Add Transaction  
- Category Chart  

---

<h2 align="left">
  🛠️ Tech Stack&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" width="40"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" width="32"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" width="50"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg" width="40"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" width="40"/>
</h2>

### 🎯 Frontend
- React.js  
- Axios  
- Chart.js  
- CSS3  

### 🗄️ Backend
- Node.js  
- Express.js  
- MongoDB Atlas  
- Mongoose  

### ☁️ Deployment
- Netlify — Frontend  
- Render — Backend  
- MongoDB Atlas — Database  

---

## 📁 Project Structure

```bash
Expense-Note
├── backend
│   ├── models
│   │   ├── Expense.js
│   │   └── Transaction.js
│   ├── routes
│   │   ├── expenses.js
│   │   └── transactions.js
│   └── server.js
│
└── frontend
    ├── src
    │   ├── App.js
    │   ├── api.js
    │   ├── index.js
    │   └── index.css
    └── public
        └── index.html
```

---

## ⚙️ Environment Variables (Backend)

Create a `.env` file inside **backend**:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

---

## ▶️ Run Locally

### 🔹 Backend
```bash
cd backend
npm install
node server.js
```

### 🔹 Frontend
```bash
cd frontend
npm install
npm start
```

Frontend → http://localhost:3000  
Backend → http://localhost:5000  

---

## ❤️ Contributions

Pull requests & ideas are always welcome!

---

## ⭐ Show Some Love

If you found this helpful, **leave a star ⭐ on GitHub!**
