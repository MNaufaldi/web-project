const mongoose = require('mongoose');
const { Schema } = mongoose;

const teacherDetailsSchema = new Schema({
    UserID: {
        type: String,
        required: true
    },
    SubjectID: {
        type: String,
        required: true
    },
    HomeroomID: {
        type: String,
        required: false
    }
},
{collection:"TeacherDetails"});

module.exports = TeacherDetails = mongoose.model('TeacherDetails', teacherDetailsSchema);
