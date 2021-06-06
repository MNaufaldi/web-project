const mongoose = require('mongoose');
const { Schema } = mongoose;

const scheduleDetailsSchema = new Schema({
    ScheduleID: {
        type: String,
        required: true
    },
    Schedule: { 
        type: [{Subject: String, Time: Date}],
        required: true
    }
},
{collection:"ScheduleDetails"});

module.exports = ScheduleDetails = mongoose.model('ScheduleDetails', scheduleDetailsSchema);
