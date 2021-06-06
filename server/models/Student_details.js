const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentDetailsSchema = new Schema({
    UserID: {
        type: String,
        required: true
    },
    ClassID: {
        type: String,
        required: true
    },
    Batch: {
        type: Number,
        required: true
    },
    ScoresID: {
        type: String,
        required: true
    }
},
{collection:"StudentDetails"});

module.exports = StudentDetails = mongoose.model('StudentDetails', studentDetailsSchema);
