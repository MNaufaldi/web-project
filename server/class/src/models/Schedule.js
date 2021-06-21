const mongoose = require('mongoose');
const { Schema } = mongoose;

const scheduleSchema = new Schema({
    TeacherID: {
        type: String,
        required: false
    },
    ClassID: {
        type: String,
        required: false
    },
    ScheduleID: {
        type: String,
        required: false
    },
    Schedule: { 
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: []
    }
},
);

module.exports = mongoose.model('Schedule', scheduleSchema);
