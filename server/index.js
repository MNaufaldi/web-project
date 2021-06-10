const express = require('express');
const mongoose = require('mongoose');
const post = require('./routes/post');
const classAndScores = require('./routes/classAndScores');
const app = express();
const user = require('./routes/user');
const dotenv = require('dotenv');

dotenv.config();

app.use(express.urlencoded({ extended: false }));
mongoose.connect(process.env.DB_CONNECT,{
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false}).then(() => console.log('Database Connected'));

// Middleware
app.use(express.json())
app.use('/api/user', user)
app.use('/api/post', post)
app.use('/api/classScores', classAndScores)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));