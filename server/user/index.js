const express = require('express');
const mongoose = require('mongoose');
const app = express();
const user = require('./src/routes/user');
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

app.use('/api/user', user)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));