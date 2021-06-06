const passport = require('passport');
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  // Authenticate user
});

router.get('/logout', (req, res) => {
  // Logout
  req.logout();
  req.send(req.user);
});

router.get('/current_user', (req, res) => {
  res.send(req.user)
});

module.exports = router;