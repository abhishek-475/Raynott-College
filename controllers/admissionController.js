const Admission = require('../models/Admission');
const Course = require('../models/Course');
const mailer = require('../utils/mailer');

exports.createAdmission = async (req, res, next) => {
  try {
    const payload = req.body;
    const admission = await Admission.create(payload);

    // optional: fetch course title
    const course = await Course.findById(payload.course);
    // send confirmation email
    if (process.env.EMAIL_USER) {
      mailer.sendMail({
        to: admission.email,
        subject: `Admission received - ${course ? course.title : 'Raynott College'}`,
        text: `Hi ${admission.name},\n\nWe received your admission application. We will contact you soon.\n\nRegards,\nRaynott Admissions`
      }).catch(console.error);
    }

    res.status(201).json(admission);
  } catch (err) {
    next(err);
  }
};

exports.getAdmissions = async (req, res, next) => {
  try {
    const admissions = await Admission.find().populate('course').sort({ createdAt: -1 });
    res.json(admissions);
  } catch (err) {
    next(err);
  }
};

exports.getAdmission = async (req, res, next) => {
  try {
    const admission = await Admission.findById(req.params.id).populate('course');
    if (!admission) return res.status(404).json({ message: 'Admission not found' });
    res.json(admission);
  } catch (err) {
    next(err);
  }
};

exports.updateAdmissionStatus = async (req, res, next) => {
  try {
    const admission = await Admission.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!admission) return res.status(404).json({ message: 'Admission not found' });
    res.json(admission);
  } catch (err) {
    next(err);
  }
};

exports.deleteAdmission = async (req, res, next) => {
  try {
    await Admission.findByIdAndDelete(req.params.id);
    res.json({ message: 'Admission deleted' });
  } catch (err) {
    next(err);
  }
};
