require('dotenv').config();
const connectDB = require('../config/db');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { slugify } = require('../utils/seedData');

const User = require('../models/User');
const Course = require('../models/Course');
const Department = require('../models/Department');
const Event = require('../models/Event');
const News = require('../models/News');

const seed = async () => {
  try {
    await connectDB();

    // cleanup
    await Promise.all([
      User.deleteMany({}),
      Course.deleteMany({}),
      Department.deleteMany({}),
      Event.deleteMany({}),
      News.deleteMany({}),
    ]);

    // ---------- USERS ----------
    const salt = await bcrypt.genSalt(10);

    const adminPass = await bcrypt.hash('admin123', salt);
    const facultyPass = await bcrypt.hash('faculty123', salt);
    const studentPass = await bcrypt.hash('student123', salt);

    const admin = await User.create({
      name: 'Raynott Admin',
      email: 'admin@raynott.edu',
      password: admin123,
      role: 'admin'
    });

    const facultyList = await User.insertMany([
      {
        name: 'Dr. Maya Singh',
        email: 'maya.singh@raynott.edu',
        password: facultyPass,
        role: 'faculty'
      },
      {
        name: 'Prof. Kiran Verma',
        email: 'kiran.verma@raynott.edu',
        password: facultyPass,
        role: 'faculty'
      },
      {
        name: 'Dr. Rohit Menon',
        email: 'rohit.menon@raynott.edu',
        password: facultyPass,
        role: 'faculty'
      }
    ]);

    const students = await User.insertMany([
      {
        name: 'Amit Rao',
        email: 'amit.rao@student.raynott.edu',
        password: studentPass,
        role: 'student'
      },
      {
        name: 'Sneha Patel',
        email: 'sneha.patel@student.raynott.edu',
        password: studentPass,
        role: 'student'
      },
      {
        name: 'Rahul Das',
        email: 'rahul.das@student.raynott.edu',
        password: studentPass,
        role: 'student'
      }
    ]);

    // ---------- DEPARTMENTS ----------
    const departments = await Department.insertMany([
      {
        name: 'Computer Science',
        slug: slugify('Computer Science'),
        description: 'CS Dept focusing on AI, ML, Cloud Computing and Software Engineering.',
        head: 'Dr. Maya Singh'
      },
      {
        name: 'Engineering',
        slug: slugify('Engineering'),
        description: 'Mechanical, Civil, and Electrical engineering programs.',
        head: 'Prof. S. Iyer'
      },
      {
        name: 'Business Administration',
        slug: slugify('Business Administration'),
        description: 'BBA, MBA and management courses.',
        head: 'Prof. Anita Kapoor'
      },
      {
        name: 'Arts & Humanities',
        slug: slugify('Arts and Humanities'),
        description: 'Literature, Psychology, Sociology programs.',
        head: 'Dr. Raj Sharma'
      },
      {
        name: 'Science',
        slug: slugify('Science'),
        description: 'Physics, Chemistry, Mathematics department.',
        head: 'Prof. Latha Rao'
      }
    ]);

    const csDept = departments[0];
    const engDept = departments[1];
    const businessDept = departments[2];
    const artsDept = departments[3];
    const sciDept = departments[4];

    // ---------- COURSES ----------
    await Course.insertMany([
      // CS Dept
      {
        title: 'B.Sc. Computer Science',
        slug: slugify('BSc Computer Science'),
        description: 'Undergraduate course in computer science.',
        department: csDept._id,
        credits: 120,
        duration: '3 years'
      },
      {
        title: 'M.Sc. Data Science',
        slug: slugify('MSc Data Science'),
        description: 'Postgraduate in data science and analytics.',
        department: csDept._id,
        credits: 80,
        duration: '2 years'
      },
      {
        title: 'BCA - Bachelor in Computer Applications',
        slug: slugify('BCA Computer Applications'),
        description: 'Professional UG course for IT industry.',
        department: csDept._id,
        credits: 100,
        duration: '3 years'
      },

      // Engineering
      {
        title: 'B.Tech Mechanical Engineering',
        slug: slugify('BTech Mechanical Engineering'),
        description: 'Engineering in mechanical field.',
        department: engDept._id,
        credits: 140,
        duration: '4 years'
      },
      {
        title: 'B.Tech Civil Engineering',
        slug: slugify('BTech Civil Engineering'),
        description: 'Course focusing on structural engineering.',
        department: engDept._id,
        credits: 140,
        duration: '4 years'
      },

      // Business
      {
        title: 'BBA - Bachelor of Business Administration',
        slug: slugify('BBA Business Administration'),
        description: 'UG course for business and management.',
        department: businessDept._id,
        credits: 110,
        duration: '3 years'
      },
      {
        title: 'MBA - Master of Business Administration',
        slug: slugify('MBA Business Administration'),
        description: 'PG course focused on leadership & strategy.',
        department: businessDept._id,
        credits: 90,
        duration: '2 years'
      },

      // Arts
      {
        title: 'BA Psychology',
        slug: slugify('BA Psychology'),
        description: 'UG course in psychology & behavioral studies.',
        department: artsDept._id,
        credits: 100,
        duration: '3 years'
      },
      {
        title: 'BA English Literature',
        slug: slugify('BA English Literature'),
        description: 'Study of English literature, poetry, drama.',
        department: artsDept._id,
        credits: 100,
        duration: '3 years'
      },

      // Science
      {
        title: 'B.Sc Physics',
        slug: slugify('BSc Physics'),
        description: 'UG physics program.',
        department: sciDept._id,
        credits: 110,
        duration: '3 years'
      },
      {
        title: 'B.Sc Chemistry',
        slug: slugify('BSc Chemistry'),
        description: 'UG chemistry specialization.',
        department: sciDept._id,
        credits: 110,
        duration: '3 years'
      },
      {
        title: 'B.Sc Mathematics',
        slug: slugify('BSc Mathematics'),
        description: 'Undergraduate mathematics course.',
        department: sciDept._id,
        credits: 110,
        duration: '3 years'
      }
    ]);

    // ---------- EVENTS ----------
    await Event.insertMany([
      {
        title: 'Freshers Day 2025',
        slug: slugify('Freshers Day 2025'),
        description: 'Welcome event for new students.',
        location: 'Main Auditorium',
        startDate: new Date(Date.now() + 5 * 86400000)
      },
      {
        title: 'Tech Fest InnovateX',
        slug: slugify('Tech Fest InnovateX'),
        description: 'Annual technology festival.',
        location: 'Block C Ground',
        startDate: new Date(Date.now() + 15 * 86400000)
      },
      {
        title: 'Entrepreneurship Workshop',
        slug: slugify('Entrepreneurship Workshop'),
        description: 'Workshop by startup founders.',
        location: 'Seminar Hall',
        startDate: new Date(Date.now() + 20 * 86400000)
      },
      {
        title: 'Sports Meet 2025',
        slug: slugify('Sports Meet 2025'),
        description: 'Inter-department sports competition.',
        location: 'College Stadium',
        startDate: new Date(Date.now() + 30 * 86400000)
      },
      {
        title: 'Alumni Meetup 2025',
        slug: slugify('Alumni Meetup 2025'),
        description: 'Meetup for all past graduates.',
        location: 'Auditorium',
        startDate: new Date(Date.now() + 40 * 86400000)
      }
    ]);

    // ---------- NEWS ----------
    await News.insertMany([
      {
        title: 'Raynott Wins Innovation Award',
        slug: slugify('Raynott Wins Innovation Award'),
        excerpt: 'Raynott College wins a regional innovation award.',
        content: 'Full story on the award and student contributions.',
        author: 'Office of Communications'
      },
      {
        title: 'New Computer Science Lab Inaugurated',
        slug: slugify('New Computer Science Lab'),
        excerpt: 'CS Department introduces a new AI/ML lab.',
        content: 'The newly built lab includes 50 high-end systems.',
        author: 'Tech Department'
      },
      {
        title: 'Engineering Students Build Solar Car',
        slug: slugify('Engineering Students Build Solar Car'),
        excerpt: 'Mechanical engineering students develop a solar car.',
        content: 'The project will compete in national-level events.',
        author: 'Engineering Dept'
      },
      {
        title: 'MBA Students Host Startup Expo',
        slug: slugify('MBA Startup Expo'),
        excerpt: 'Business School hosts a startup showcase.',
        content: 'Over 30 student startups participated.',
        author: 'Business School'
      },
      {
        title: 'Psychology Dept Hosts Mental Health Week',
        slug: slugify('Mental Health Week'),
        excerpt: 'Awareness week conducted by the Arts faculty.',
        content: 'Workshops, counseling, and more.',
        author: 'Counseling Cell'
      },
      {
        title: 'Mathematics Dept Secures Research Grant',
        slug: slugify('Math Research Grant'),
        excerpt: 'Department receives government research grant.',
        content: 'Funding will support advanced math studies.',
        author: 'Science Department'
      }
    ]);

    console.log('✅ Seeding completed with extended dataset!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error', err);
    process.exit(1);
  }
};

seed();
