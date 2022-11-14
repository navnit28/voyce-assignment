const mongoose = require('mongoose')

const userBody = {
    balance: {
        type: Number,
        default: 100,
        required: true
    }
}

const userSchema = mongoose.Schema(userBody, {
    timestamps: true
})


userSchema.pre('save', async function (next) {

    next()
})

userSchema.post('save', async function () {
})



const User = mongoose.model('users', userSchema)
module.exports = User