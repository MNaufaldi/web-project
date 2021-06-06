const { response } = require('express');
const express = require('express');
const router = express.Router();
const users = require('../services/user');

// Model

// Route
router.get('/', (req, res) => {
    res.send('pog')
});

router.post('/register', async (req, res) => {
    const User = new users();
    try{
        await User.register(req.body);
        res.sendStatus(200);
        
    } catch(err) {
        res.status(400).send(err);
    }
    
});

router.post('/login', async (req, res) => {
    const User = new users();
    try{
        const token = await User.login(req.body);
        res.header('auth-token', token).send(token);
        // res.sendStatus(200)
    } catch (err){
        res.status(400).send(err);
    }
})


module.exports = router;