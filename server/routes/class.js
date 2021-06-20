const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');
const Subject = require('../models/Subject');
const Classroom = require('../models/Class');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { Mongoose } = require('mongoose');

// SCHEDULE
// Get schedule
router.get('/get/schedule/:id', async (req, res) => {
    const token = jwt.verify(req.header('auth-token'), process.env.SECRET);
    let schedules;
    var today = new Date().toLocaleString("default", {weekday:"long"}).toLowerCase()
    switch(token.role) {
        case 'Student':
            schedules = await Schedule.findOne({ClassID: req.params.id}).lean();
            break;
        case 'Teacher':
            schedules = await Schedule.findOne({TeacherID: req.params.id}).lean();
            break;
    }

    if(!schedules) return res.sendStatus(400);
    var todaySchedule = schedules.Schedule[today]

    if(!todaySchedule) return res.send(null).status(200);

    let ids = [];
    todaySchedule.forEach(function(x) {
        ids.push(x[0]);
    })
    let names; 
    switch(token.role) {
        case 'Student':
            names = await Subject.find({SubjectID: ids}).lean();
            // Get names
            todaySchedule = todaySchedule.map(function(x) {
                x[0] = (names.find(y => y.SubjectID == x[0]).SubjectName);
                return x;
            })
            break;
        case 'Teacher':
            names = await Classroom.find({ClassID: ids}).lean();

            // Get names
            todaySchedule = todaySchedule.map(function(x) {
                x[0] = (names.find(y => y.ClassID == x[0]).ClassName);
                return x;
            })
            break;
    }


    res.status(200).send(todaySchedule);

});
// Delete schedule
router.delete('/delete/schedule/:id', async(req, res) => {
    const _id = req.params.id
    try {
        const user = await Schedule.findByIdAndDelete(_id);
        res.sendStatus(200);
    } catch(err) {
        res.sendStatus(400);
    }
    try {
        const user = await Schedule_details.findByIdAndDelete(_id);
        res.sendStatus(200);
    } catch(err) {
        await Schedule.save();
        res.sendStatus(400);
    }
});
// Patch schedule details
router.patch('/patch/schedule/:id', async (req, res) => {
    try{
        await Post_details.findOneAndUpdate({_id: req.params.id}, req.body);
        res.sendStatus(200);
    } catch(e) {
        res.sendStatus(400);
    }
});
router.post('/create/schedule', async (req, res) => {
    // ADMIN ONLY
    // Not finished
    const sched = {monday: eval(req.body.monday), 
    tuesday: eval(req.body.tuesday), 
    wednesday: eval(req.body.wednesday), 
    thursday: eval(req.body.thursday), 
    friday: eval(req.body.friday)}
    
    const newSchedule = new Schedule({
        ClassID: req.body.classId,
        Schedule: sched
    });

    try {
        await newSchedule.save();
    } catch(err) {
        res.sendStatus(400);
    }
    res.sendStatus(200);
})

// CLASS
// Get classroom
router.get('/get/class/:id', async (req, res) => {
    const token = req.header('auth-token');
    if(!token) return res.sendStatus(400);
    let classroom;
    try {
        classroom = await Classroom.findOne({ClassID: req.params.id}).lean();
    } catch(err) {
        return res.sendStatus(400);
    }
    res.status(200).send(classroom);

});

router.get('/get/className/:id', async (req, res) => {
    const token = req.header('auth-token');
    if(!token) return res.sendStatus(400);
    let classroom;
    try {
        classroom = await Classroom.findOne({ClassID: req.params.id}).lean();
    } catch(err) {
        return res.sendStatus(400);
    }
    res.status(200).send(classroom.ClassName);

});
// Patch classroom
router.patch('/patch/class/:id', async (req, res) => {
    try{
        await Classroom.findOneAndUpdate({_id: req.params.id}, req.body);
        res.sendStatus(200);
    } catch(e) {
        res.sendStatus(400);
    }
});
// Create classroom
router.post('/create/class', async (req, res) => {
    // ADMIN ONLY
    const ifExist = await Classroom.findOne({ClassID: req.body.classId});
    if(ifExist) return res.sendStatus(400);

    const newClass = new Classroom({
        ClassID: req.body.classId,
        ClassName: req.body.className,
        Batch: req.body.batch,
        StudentsID: []
    });
    try {
        await newClass.save();
    } catch(err) {
        res.sendStatus(400);
    }
    res.sendStatus(200);
});
// Delete classroom
router.delete('/delete/class/:id', async(req, res) => {
    try {
        const user = await Classroom.findByIdAndDelete(req.params.id);
        res.sendStatus(200);
    } catch(err) {
        res.sendStatus(400);
    }
});

// SUBJECT
// Create subject
router.post('/create/subject', async (req, res) => {
    // ADMIN ONLY
    // NOT FINISHED
    // Check first
    // Add subject
    const subject = new Subject({
        SubjectID: req.body.subjectId,
        SubjectName: req.body.subjectName
    });
    try {
        await subject.save();
    } catch(err) {
        res.sendStatus(400);
    }
    res.sendStatus(200);

});
// Delete subject
router.delete('/delete/subject/:id', async(req, res) => {
    try {
        const subject = await Subject.findByIdAndDelete(req.params.id);
        res.sendStatus(200);
    } catch(err) {
        res.sendStatus(400);
    }
});
router.get('/get/subject/:id', async (req, res) => {
    const token = req.header('auth-token');
    if(!token) return res.sendStatus(400);
    let subject;
    try {
        subject = await Subject.findOne({SubjectID: req.params.id}).lean();
    } catch(err) {
        return res.sendStatus(400);
    }
    res.status(200).send(subject.SubjectName);
})

module.exports = router;