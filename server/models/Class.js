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
    Batch: {
        type: String,
        required: true
    }
},
);

module.exports = mongoose.model('Class', classSchema);
