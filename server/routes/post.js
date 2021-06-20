const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Post_details = require('../models/Post_details');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const differenceInDays = require('date-fns/differenceInDays');
dotenv.config();

// Create new post
router.post('/create', async (req, res) => {
    // TEACHER ONLY
    // Add validation with Joi later
    // Get payload from token
    const payload = jwt.verify(req.header('auth-token'), process.env.SECRET);
    // Maybe verify if its a teacher?
    
    // Get date now
    const date = new Date();
    const dateDue = new Date(req.body.dueDate);

    // Create new post
    const newPost = new Post({
        TeacherID: payload._id,
        SubjectID: req.body.subjectId,
        ClassID: req.body.class,
        Batch: req.body.batch
    });
    // Create new post details
    const newPostDetails = new Post_details({
        _id: newPost._id,
        Title: req.body.title,
        Description: req.body.description,
        Date_created: date,
        Date_due: dateDue
    });

    // save to database
    try {
        try {
            await newPost.save();
        } catch(e) {
            console.log(e);
        }
        try {
            await newPostDetails.save();
        } catch(e) {
            await Post.deleteOne({_id: newPost._id});
            console.log(e);
        }  
    } catch(err) {
        res.status(400).send(err);
    }
    res.sendStatus(200);

})
// Delete a post
router.delete('/delete/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const post = await Post.findByIdAndDelete(_id);
        res.sendStatus(200);
    } catch(err) {
        res.sendStatus(400);
    }
    try {
        const post_details = await Post_details.findByIdAndDelete(_id);
        res.sendStatus(200);
    } catch(err) {
        await user.save();
        res.sendStatus(400);
    }
})
// Edit post
router.patch('/patch/:id', async (req, res) => {
    try{
        await Post_details.findOneAndUpdate({_id: req.params.id}, req.body);
        res.sendStatus(200);
    } catch(e) {
        res.sendStatus(400);
    }
});
// Get posts
router.get('/get/:id', async(req, res) => {
    // Get token
    const token = jwt.verify(req.header('auth-token'), process.env.SECRET);
    if(!token) return res.sendStatus(400);
    let posts;
    const date = new Date();
    const formed = date.toISOString().split("T")[0];
    switch (token.role){
        case 'Student':
            try {
                const classId = req.params.id.slice(0, 1);
                const batch = req.params.id.slice(1, req.params.id.length);
                posts = await Post.find({ClassID: classId, Batch: batch}).lean();
            } catch (err) {
                res.sendStatus(400);
            }
            break;
        case 'Teacher':
            try {
                posts = await Post.find({TeacherID: req.params.id}).lean();
            } catch (err) {
                res.sendStatus(400);
            }
            break;
    }

    // If there is no posts
    if (!posts) return res.send(null);
    // Put post id in an array
    var ids = [];
    for (var key in posts) {
        ids.push(posts[key]._id);
    }

    let posts_details;
    try {
        posts_details = await Post_details.find({_id: ids}).lean()
    } catch (err) {
        res.sendStatus(400);
    };

    // Combine the 2 array of objects
    let mapped = posts_details.reduce((a, c) => (a[c._id] = c, a), {});
    let payload = posts.map(o => Object.assign(o, mapped[o._id]));
    // Delete posts that are due
    payload = payload.filter(obj => obj.Date_due > date);
    
    // Sort by due date
    payload.sort(function(a, b){ 
        return new Date(a.Date_due) - new Date(b.Date_due);
    })
    
    // Format dates
    payload.forEach(obj => {
        obj.Date_created = differenceInDays(new Date(formed), new Date(obj.Date_created))
        obj.Date_due = differenceInDays(new Date(obj.Date_due), new Date(formed))
    })
    //  
    res.status(200).send(payload);
})

module.exports = router;