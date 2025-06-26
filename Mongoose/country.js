const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const countrySchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
    },
    teams: [{
        type: Schema.Types.ObjectId,
        ref: "Team"
    }]
}, {
    autoIndex: true,
    timestamps: true,
    minimize: true,
    versionKey: '_myversion'
})
const Country = mongoose.model('Country', countrySchema, 'country')
module.exports = Country