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
{collection:"Schedule"});

module.exports = Schedule = mongoose.model('Schedule', scheduleSchema);
