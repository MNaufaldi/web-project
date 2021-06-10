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
    },
    ScheduleID: {
        type: String,
        required: false
    }
},
);

module.exports = mongoose.model('TeacherDetails', teacherDetailsSchema);
