const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');               
const ProgramEntry = require('../models/ProgramEntry');  
const FacultyStats = require('../models/FacultyStats');  

dotenv.config();
connectDB();

const seedData = async () => {
  await ProgramEntry.deleteMany();
  await ProgramEntry.insertMany([
    { name: 'B.Tech Computer Science', duration: 4, degree: 'B.Tech' },
    { name: 'MBA', duration: 2, degree: 'MBA' }
  ]);

  await FacultyStats.deleteMany();
  await FacultyStats.insertMany([
    { name: 'Dr. Sharma', department: 'Computer Science' },
    { name: 'Prof. Mehta', department: 'Management' }
  ]);

  console.log('Data seeded!');
  process.exit();
};

seedData();
