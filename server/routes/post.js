const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Post_details = require('../models/Post_details');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Create new post
router.post('/create', async (req, res) => {
    // Add validation with Joi later

    // Get payload from token
    const payload = jwt.verify(req.header('auth-token'), process.env.SECRET);
    // Maybe verify if its a teacher?
    
    // Get date now
    const date = new Date();

    // Create new post
    const newPost = new Post({
        TeacherID: payload._id,
        SubjectID: req.body.subjectId,
        ClassID: req.body.classId,
        Batch: req.body.batch
    });
    // Create new post details
    const newPostDetails = new Post_details({
        _id: newPost._id,
        Title: req.body.title,
        Description: req.body.description,
        Date_created: date,
        Date_due: req.body.dateDue
    });

    // save to database
    console.log(newPost);
    console.log(newPostDetails);

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
router.get('/get/:classId-:batch', async(req, res) => {
    try {
        const posts = await Post.find({ClassID: req.params.classId, Batch: req.params.batch});
        if (!posts) res.status(200).send('None');
    } catch(err) {
        res.sendStatus(400);
    }
    // Get the posts details
    // try {
    //     const posts_details = await Post_details.find({_id: posts._id})
    // }
    // Map and return the posts and the details

})

module.exports = router;