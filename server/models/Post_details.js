const mongoose = require('mongoose');
const { Schema } = mongoose;

const postDetailsSchema = new Schema({
    Title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Date_created: {
        type: Date,
        required: true
    },
    Date_due: {
        type: Date,
        required: true
    }
},
);

module.exports = mongoose.model('PostDetails', postDetailsSchema);
