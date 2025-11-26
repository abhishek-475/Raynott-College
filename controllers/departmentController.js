const Department = require('../models/Department');

exports.getAllDepartments = async (req, res, next) => {
  try {
    const deps = await Department.find().sort({ name: 1 });
    res.json(deps);
  } catch (err) {
    next(err);
  }
};

exports.getDepartment = async (req, res, next) => {
  try {
    const dep = await Department.findOne({ slug: req.params.slug });
    if (!dep) return res.status(404).json({ message: 'Department not found' });
    res.json(dep);
  } catch (err) {
    next(err);
  }
};

exports.createDepartment = async (req, res, next) => {
  try {
    const dep = await Department.create(req.body);
    res.status(201).json(dep);
  } catch (err) {
    next(err);
  }
};

exports.updateDepartment = async (req, res, next) => {
  try {
    const dep = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!dep) return res.status(404).json({ message: 'Department not found' });
    res.json(dep);
  } catch (err) {
    next(err);
  }
};

exports.deleteDepartment = async (req, res, next) => {
  try {
    const dep = await Department.findByIdAndDelete(req.params.id);
    if (!dep) return res.status(404).json({ message: 'Department not found' });
    res.json({ message: 'Department deleted' });
  } catch (err) {
    next(err);
  }
};
