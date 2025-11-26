require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const errorMiddleware = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const eventRoutes = require('./routes/eventRoutes');
const newsRoutes = require('./routes/newsRoutes');
const admissionRoutes = require('./routes/admissionRoutes');
const contactRoutes = require('./routes/contactRoutes');




const app =express()
connectDB()

app.use(cors());
app.use(express.json())
app.use('/uploads', express.static('uploads'));



app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/admissions', admissionRoutes);
app.use('/api/contact', contactRoutes);


app.use(errorMiddleware);


const PORT = process.env.PORT || 5000



app.listen(PORT,()=>{
    console.log(`server running on port: ${PORT}`);
    
})