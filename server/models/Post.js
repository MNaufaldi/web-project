const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    PostID: {
        type: String,
        required: true
    },
    TeacherID: {
        type: String,
        required: true
    },
    SubjectID: {
        type: String,
        required: true
    },
    ClassID: {
        type: String,
        required: true
    }
},
{collection:"Post"});

module.exports = Post = mongoose.model('Post', postSchema);
