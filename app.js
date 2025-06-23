const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const authRouter = require('./endpoints/authrouter');
const employeeRouter = require('./endpoints/api/employeeRouter');
const logoutRouter = require('./endpoints/logoutRouter');
const refreshRouter = require('./endpoints/refreshRouter');
const registerRouter = require('./endpoints/registerRouter');

const app = express();

// Middleware 
app.use(helmet());
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/employees', employeeRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/refresh', refreshRouter);
app.use('/api/register', registerRouter);

// Health Check
app.get('/', (req, res) => res.send('API is running!'));

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
