const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const teacherRoutes = require('./routes/teacher'); 


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/teacher', teacherRoutes);

// Connect to DB
require('./config/db')();

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
  
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));