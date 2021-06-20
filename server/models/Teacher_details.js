const mongoose = require('mongoose');
const { Schema } = mongoose;

const teacherDetailsSchema = new Schema({
    SubjectID: {
        type: String,
        required: true
    },
    ClassID: {
        type: [String],
        required: true
    },
    ScheduleID: {
        type: String,
        required: false
    }
},
);

module.exports = mongoose.model('TeacherDetails', teacherDetailsSchema);
