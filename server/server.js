const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

// ORM setup
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('database_name', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
})

// Continue from here.

const app = express();
const PORT = process.env.PORT || 3080;

app.use(cors());
app.use(bodyParser.json())


app.get('/message', (req, res)=>{
    res.json({ message: "Hello from server!"});
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});

// Routes
// app.use('/students', studentRoutes)

// Error Middleware
// app.use(errorMiddleware);


