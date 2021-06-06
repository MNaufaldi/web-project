const mongoose = require('mongoose');
const { Schema } = mongoose;

const roleSchema = new Schema({
    RoleID: {
        type: Number,
        required: true
    },
    RoleName: {
        type: String,
        required: true
    }
},
{collection:"Role"});

module.exports = Role = mongoose.model('Role', roleSchema);
