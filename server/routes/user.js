const express = require('express');
const router = express.Router();
const User = require('../models/User');
const StudentDetails = require('../models/Student_details');
const TeacherDetails = require('../models/Teacher_details');
const UserRole = require('../models/User_Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User_Role = require('../models/User_Role');
const Student_details = require('../models/Student_details');
// Separate joi to another file
// const Joi = require('@hapi/joi');

// const schema = {
//     username: Joi.string().min(6).required(),
//     password: Joi.string().min(6).required(),
    
// }

// Routes
// Register student
router.post('/register/student', async (req, res) => {
    // Validation
    // const {error} = Joi.validate(req.body, schema);
    // if(error) return res.status(400).send(error.details[0].message);
    // Check if user exist
    const userExist = await User.findOne({ Username: req.body.username});
    if (userExist) return res.status(400).send('User already exist');

    // Hash
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Year
    const currentYear = new Date().getFullYear();

    const user = new User({
        Username: req.body.username,
        Password: hashPassword,
        First_name: req.body.first_name,
        Last_name: req.body.last_name,
        Photo: req.body.photo,
        DateOfBirth: req.body.dateOfBirth

    });
    const student_details = new StudentDetails({
        _id: user._id,
        Batch: currentYear
    });
    const student_role = new UserRole({
        _id: user._id,
        RoleID: '1'
    });

    try{
        try {
            await user.save()
        } catch(e) {
            res.status(400).send(err)
        }
        try {
            await student_details.save()
        } catch(e) {
            User.deleteOne({_id: user._id})
            res.status(400).send(err)
        }
        try {
            await student_role.save()
        } catch(e) {
            User.deleteOne({_id: user._id})
            StudentDetails.deleteOne({_id: user._id})
            res.status(400).send(err)
        }
        res.sendStatus(200);
    } catch(err) {
        res.status(400).send(err);
    }
    
});
// Register teacher
router.post('/register/teacher', async (req, res) => {
    // Validation
    // const {error} = Joi.validate(req.body, schema);
    // if(error) return res.status(400).send(error.details[0].message);
    // Check if user exist
    const userExist = await User.findOne({ Username: req.body.username});
    if (userExist) return res.status(400).send('User already exist');

    // Hash
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Year
    const currentYear = new Date().getFullYear();

    const user = new User({
        Username: req.body.username,
        Password: hashPassword,
        First_name: req.body.first_name,
        Last_name: req.body.last_name,
        Photo: req.body.photo,
        DateOfBirth: req.body.dateOfBirth

    });
    const teacher_details = new TeacherDetails({
        _id: user._id,
        SubjectID: req.body.subjectId
    });
    const teacher_role = new UserRole({
        _id: user._id,
        RoleID: '2'
    });

    try{
        try {
            await user.save()
        } catch(e) {
            res.status(400).send(err)
        }
        try {
            await teacher_details.save()
        } catch(e) {
            User.deleteOne({_id: user._id})
            res.status(400).send(err)
        }
        try {
            await teacher_role.save()
        } catch(e) {
            User.deleteOne({_id: user._id})
            TeacherDetails.deleteOne({_id: user._id})
            res.status(400).send(err)
        }
        res.sendStatus(200);
    } catch(err) {
        res.status(400).send(err);
    }
})
// Login
router.post('/login', async (req, res) => {
    const user = await User.findOne({Username: req.body.username});
    // If there is no said username
    if (!user) return res.status(400).send('Invalid username or password');
    // If password is correct
    const validPass = await bcrypt.compare(req.body.password, user.Password);
    // const validPass = req.body.password === user.Password;
    if(!validPass) return res.status(400).send('Invalid password');

    // GET ROLES
    const role = await UserRole.findOne({_id: user._id});
    if (!role) return res.status(400)

    // Assign token
    const token = jwt.sign({_id: user._id, role:role.RoleID}, process.env.SECRET)
    req.user = user;
    res.header('auth-token', token).send(token);
});
// Get user by id
router.get('/get/:id', async (req, res) => {
    const user = await User.findOne({_id: req.params.id});
    if (!user) return res.status(400)
    const user_details = {
        'id' : user._id,
        'First_name' : user.First_name,
        'Last_name' : user.Last_name,
        'Photo' : user.Photo,
        'dateOfBirth' : user.DateOfBirth
    };
    res.status(200).send(user_details);
});
// Edit user
router.patch('/patch/:id', async (req, res) => {
    try{
        await User.findOneAndUpdate({_id: req.params.id}, req.body);
        res.sendStatus(200);
    } catch(e) {
        res.sendStatus(400);
    }
    
});
// Delete user
router.delete('/delete/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findByIdAndDelete(_id);
        res.sendStatus(200);
    } catch(err) {
        res.sendStatus(400);
    }
    try {
        const role = await User_Role.findByIdAndDelete(_id);
        res.sendStatus(200);
    } catch(err) {
        await user.save();
        res.sendStatus(400);
    }
    try {
        const details = null;
        switch (role.RoleID) {
            case '1':
                details = await Student_details.findByIdAndDelete(_id);
            case '2':
                details = await Teacher_details.findByIdAndDelete(_id);
        }
    } catch(err) {
        await user.save();
        await role.save();
        res.sendStatus(400);
    }
})

module.exports = router;