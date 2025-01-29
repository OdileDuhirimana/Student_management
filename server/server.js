const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const adminMiddleware = require('./middleware/adminMiddleware');
const { Sequelize } = require('sequelize');
const {swaggerDocs, swaggerUi} = require('./swaggerConfig');


// ORM setup
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
});

// Test and sync the database
sequelize
  .authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Unable to connect to the database:', err));

sequelize
  .sync({ force: false })
  .then(() => console.log('Database synced'))
  .catch((err) => console.error('Error syncing database:', err));

const app = express();
const PORT = process.env.PORT || 3080;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', userRoutes);

// Public route
app.get('/message', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// Error middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Server Error' });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
