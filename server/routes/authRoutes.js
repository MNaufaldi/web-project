const passport = require('passport');

module.exports = app => {
  app.post(
    '/auth',
    // passport.authenticate('local')
    // console.log('ye')
    (res, err) =>{
      console.log(res)
      console.log(err)
    }
  );
  
  app.get(
    '/auth/test', (req, res) =>{
      res.send('a');
    }
  )

  app.get('/auth/callback', passport.authenticate('local'));

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};