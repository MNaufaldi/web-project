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
        required: false
    },
    TeacherID: {
        type: String,
        required: false
    },
},
);

module.exports = mongoose.model('Class', classSchema);
