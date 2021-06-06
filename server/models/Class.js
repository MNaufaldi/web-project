const mongoose = require('mongoose');
const { Schema } = mongoose;

const classSchema = new Schema({
    ClassID: {
        type: String,
        required: true
    },
    ClassName: {
        type: String,
        required: true
    },
    StudentsID: {
        type: [String],
        required: true
    },
    TeacherID: {
        type: String,
        required: true
    },
},
{collection:"Class"});

module.exports = Class = mongoose.model('Class', classSchema);
