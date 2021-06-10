const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');
const Schedule_details = require('../models/Schedule_details');
const Scores = require('../models/Scores');
const Subject = require('../models/Subject');
const Classroom = require('../models/Class');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// SCHEDULE
// Get schedule
router.get('/get/schedule', async (req, res) => {
    const payload = jwt.verify(req.header('auth-token'), process.env.SECRET);
    switch(payload.role) {
        case 'Teacher':
            console.log('Get teacher schedule');
        case 'Student':
            console.log('Get student schedule');
    }

    res.sendStatus(200);

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
    console.log('create schedule');
})

// CLASS
// Get classroom
router.get('/get/class/:id', async (req, res) => {
    console.log('get class by id?');
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
    console.log('create classroom')
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

// SCORES
// Get scores
router.get('/get/scores/:id', async (req, res) => {
    console.log('get scores');
});
// Patch scores
router.patch('/patch/scores/:id', async (req, res) => {
    try{
        await Scores.findOneAndUpdate({_id: req.params.id}, req.body);
        res.sendStatus(200);
    } catch(e) {
        res.sendStatus(400);
    }
});
// Create scores
router.post('/create/scores', async (req, res) => {
    console.log('create scores')
});
// Delete scores
router.delete('/delete/scores/:id', async(req, res) => {
    try {
        const user = await Scores.findByIdAndDelete(req.params.id);
        res.sendStatus(200);
    } catch(err) {
        res.sendStatus(400);
    }
});

module.exports = router;