const mongoose = require('mongoose');
const { Schema } = mongoose;

const scheduleSchema = new Schema({
    ScheduleID: {
        type: String,
        required: true
    },
    ClassID: {
        type: String,
        required: true
    }
},
);

module.exports = mongoose.model('Schedule', scheduleSchema);
