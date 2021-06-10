const mongoose = require('mongoose');
const { Schema } = mongoose;

const userRoleSchema = new Schema({
    RoleID: {
        type: String,
        required: true
    }
},
);

module.exports = mongoose.model('UserRole', userRoleSchema);
