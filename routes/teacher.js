const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middlewares/auth');

// Create new project
router.post('/projects', auth('teacher'), projectController.addProject);

// Get teacher's own projects
router.get('/projects', auth('teacher'), projectController.getOwnProjects);

module.exports = router;
