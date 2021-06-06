const mongoose = require('mongoose');
const { Schema } = mongoose;

const postDetailsSchema = new Schema({
    PostID: {
        type: String,
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Date_created: {
        type: Date,
        required: true
    },
    Date_due: {
        type: Date,
        required: true
    }
},
{collection:"PostDetails"});

module.exports = PostDetails = mongoose.model('PostDetails', postDetailsSchema);
