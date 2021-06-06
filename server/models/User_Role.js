const mongoose = require('mongoose');
const { Schema } = mongoose;

const userRoleSchema = new Schema({
    UserID: {
        type: String,
        required: true
    },
    RoleID: {
        type: String,
        required: true
    }
},
{collection:"UserRole"});

module.exports = UserRole = mongoose.model('UserRole', userRoleSchema);
