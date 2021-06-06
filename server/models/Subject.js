const mongoose = require('mongoose');
const { Schema } = mongoose;

const subjectSchema = new Schema({
    SubjectID: {
        type: String,
        required: true
    },
    SubjectName: {
        type: String,
        required: true
    }
},
{collection:"Subject"});

module.exports = Subject = mongoose.model('Subject', subjectSchema);
