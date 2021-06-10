const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
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
    },
    Batch: {
        type: Date,
        required: true
    }
},
);

module.exports = mongoose.model('Post', postSchema);
