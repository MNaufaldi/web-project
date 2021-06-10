const { compare } = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/keys');

class users {
    async register(data) {
        const user = new User({
            ID: data.id,
            Username: data.username,
            Password: data.password,
            First_name: data.first_name,
            Last_name: data.last_name,
            Photo: data.photo,
            DateOfBirth: data.dateOfBirth
    
        });
        await user.save();
    }

    async login(data){
        const user = await User.findOne({Username: data.username});
        // If user exist
        if (!user) return res.status(400).send('Invalid username or password');
        // If password is correct
        // const validPass = await bcrypt.compare(data.password, user.Password);
        const validPass = data.password === user.Password;
        
        if(!validPass) return res.status.send('Invalid password');
        // Assign token
        const token = jwt.sign({_id: user._id}, config.secret)
        return token
    }   
}

module.exports = users