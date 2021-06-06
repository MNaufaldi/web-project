const mongoose = require('mongoose');
const { Schema } = mongoose;

const scoresSchema = new Schema({
    ScoresID: {
        type: String,
        required: true
    },
    Scores: {
        type: [{SubjectID: String, Score: Number}]
    }
},
{collection:"Scores"});

module.exports = Scores = mongoose.model('Scores', scoresSchema);
