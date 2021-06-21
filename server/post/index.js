
const express = require('express');
const mongoose = require('mongoose');
const post = require('./src/routes/post');
const app = express();
const dotenv = require('dotenv');

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.DB_CONNECT,{
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false}).then(() => console.log('Database Connected'));

// Middleware
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'auth-token, Content-Type, Accept');
	next();
  });

app.use('/api/post', post)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));