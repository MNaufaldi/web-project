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
const dotenv = require('dotenv');
const Teacher_details = require('../models/Teacher_details');

dotenv.config();

// Routes
// Register student
router.post('/register/student', async (req, res) => {

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
        Batch: currentYear,
        ClassID: []
    });
    const student_role = new UserRole({
        _id: user._id,
        Role: 'Student'
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
            await User.deleteOne({_id: user._id})
            res.status(400).send(err)
        }
        try {
            await student_role.save()
        } catch(e) {
            await User.deleteOne({_id: user._id})
            await StudentDetails.deleteOne({_id: user._id})
            res.status(400).send(err)
        }
        res.sendStatus(200);
    } catch(err) {
        res.status(400).send(err);
    }
    
});
// Register teacher
router.post('/register/teacher', async (req, res) => {
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
        Role: 'Teacher'
    });

    try{
        try {
            await user.save()
        } catch(e) {
            res.status(400).send(e)
        }
        try {
            await teacher_details.save()
        } catch(e) {
            await User.deleteOne({_id: user._id})
            res.status(400).send(e)
        }
        try {
            await teacher_role.save()
        } catch(e) {
            await User.deleteOne({_id: user._id})
            await TeacherDetails.deleteOne({_id: user._id})
            res.status(400).send(e)
        }
        res.sendStatus(200);
    } catch(err) {
        res.status(400).send(err);
    }
})
// Login
router.post('/login', async (req, res) => {
    // Find user with the same username
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
    const token = jwt.sign({_id: user._id, role:role.Role}, process.env.SECRET, {expiresIn: '24h'});
    user.Password = undefined;
    const payload = {id: user._id, token: token};
    res.header('auth-token', token);
    res.header('Access-Control-Allow-Origin', "*");
    res.status(200).send(payload);
    
});
// Get user
router.get('/get', async (req, res) => {
    const token = req.header('auth-token');
    const decoded = jwt.verify(token, process.env.SECRET)
    const user = await User.findOne({_id: decoded._id});
    if (!user) return res.status(400)

    // Get role
    var details;
    const role = await UserRole.findOne({_id: decoded._id});
    if (!role) return res.status(400)
    switch (role.Role){
        case 'Student':
            details = await StudentDetails.findOne({_id: decoded._id});
            details = {
                Batch: details.Batch,
                ClassID: details.ClassID
            };
            break; 
        case 'Teacher':
            details = await TeacherDetails.findOne({_id: decoded._id});
            details = {
                SubjectID: details.SubjectID,
                ClassID: details.ClassID
            };
            break;
    }
    const payload = {user, details};
    payload.user.Username = undefined;
    payload.user.Password = undefined;
    payload.user._id - undefined;
    res.status(200).send(payload);
});
router.get('/auth', async (req, res) => {
    const token = req.header('auth-token');
    if(!token)  return res.status(401).send(false);
    try {
        const verified = jwt.verify(token, process.env.SECRET);
        res.status(200).send(true)
    } catch(err) {
        res.sendStatus(400);
    }
})
// Get Role
router.get('/get/role', async (req, res) => {
    const token = req.header('auth-token');
    if(!token) return res.status(400);
    const decoded = jwt.verify(token, process.env.SECRET);
    // Verify role?
    const role = await UserRole.findOne({_id: decoded._id});
    if(!role) return res.status(400);
    if(role.Role !== decoded.role) return res.status(400);
    res.status(200).send(role.Role);

})
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