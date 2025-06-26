const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const teamSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
    },
    team_year: {
        type: Schema.Types.Number,
        required: true
    },
    countryId: {
        type: Schema.Types.ObjectId,
        ref: 'country'
    }
}, {
    autoIndex: true,
    timestamps: true,
    minimize: true,
    versionKey: '_myversion'
})
const Team = mongoose.model('Team', teamSchema, 'team')
module.exports = Team