const mongoose = require('mongoose');

const Schema = mongoose.Schema

const animalSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
        validate: () => Promise.resolve(true)
        // unique: true
    },
    family: {
        type: Schema.Types.String,
        required: [true, "Family is Required"]
    },
    age: {
        type: Schema.Types.Number,
        required: function() {
            return this.age > 3
        }
    },
    live_area: {
        type: Schema.Types.Array,
        validate: {
            validator: function(value){
                return value.length < 2
            },
            message: field => field.value + "Geçersiz"
        }
    }
}, {
    autoIndex: true,
    timestamps: true,
    minimize: true,
    validateBeforeSave: true,
    versionKey: "_v",
})
animalSchema.statics.findByAnimalName = function(name) {
    console.log('merhaba' + name)
    return this.find({ name })
    
}

animalSchema.query.byFamily = function(family) {
    console.log('byFamily')
    return this.where({ family })
}

animalSchema.virtual("animalFamily").get(function () {
    console.log('getter', this)
    return this.name + "-" + this.family + new Date().toLocaleDateString()
}).set(function (val) {
    console.log('setter', val)
    this.name = val.toUpperCase() + "-selam" + Date.now()
})

animalSchema.pre("save", (next) => {
    console.log("save Middleware çalışıyor")
    next()
})

const Animal = mongoose.model("Animal", animalSchema, "animal")
module.exports = Animal