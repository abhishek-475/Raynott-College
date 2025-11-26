const Course = require('../models/Course');

// GET /api/courses
exports.getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().populate('department').sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    next(err);
  }
};

// GET /api/courses/:id or /slug
exports.getCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = isNaN(id) && id.length >= 24 ? { _id: id } : { slug: id };
    const course = await Course.findOne(query).populate('department');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    next(err);
  }
};

// POST /api/courses - admin
exports.createCourse = async (req, res, next) => {
  try {
    const payload = req.body;
    const course = await Course.create(payload);
    res.status(201).json(course);
  } catch (err) {
    next(err);
  }
};

// PUT /api/courses/:id - admin
exports.updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/courses/:id - admin
exports.deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Course deleted' });
  } catch (err) {
    next(err);
  }
};
