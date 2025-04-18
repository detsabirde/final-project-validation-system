const Project = require('../models/Project');

exports.addProject = async (req, res) => {
  try {
    const { title, description, technologies } = req.body;

    const newProject = new Project({
      title,
      description,
      technologies,
      teacher: req.user.id
    });

    await newProject.save();
    res.status(201).json({ message: 'Project created successfully', project: newProject });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getOwnProjects = async (req, res) => {
  try {
    const projects = await Project.find({ teacher: req.user.id });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
