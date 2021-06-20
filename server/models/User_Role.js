const mongoose = require('mongoose');
const { Schema } = mongoose;

const userRoleSchema = new Schema({
    Role: {
        type: String,
        required: true
    }
},
);

module.exports = mongoose.model('UserRole', userRoleSchema);
