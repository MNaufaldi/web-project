const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentDetailsSchema = new Schema({
    ClassID: {
        type: String,
        required: false
    },
    Batch: {
        type: Number,
        required: true
    },
},
);

module.exports = mongoose.model('StudentDetails', studentDetailsSchema);
