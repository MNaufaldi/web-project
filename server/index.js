const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const localStrategy = require('passport-local').Strategy;
const keys = require('./config/keys');
const app = express();
const students = require('./routes/students');
const user = require('./routes/user');

app.use(express.urlencoded({ extended: false }));
mongoose.connect(keys.mongoURI,{
	useNewUrlParser: true,
	useUnifiedTopology: true}).then(() => console.log('Database Connected'));

// Middleware
app.use(express.json())
app.use('/', students)
app.use('/api/user', user)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));