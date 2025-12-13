// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/programs', require('./routes/programRoutes'));
app.use('/api/faculty', require('./routes/facultyRoutes'));

// health
app.get('/', (req, res) => res.json({ ok: true, msg: 'University backend running' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));


