const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)  // Use native findOneAndUpdate() instead of deprecated userFindAndModify() behind the scenes

const userSchema = new mongoose.Schema({
	email: { type: String, required: true },
	password: { type: String, required: true }
})

const User = mongoose.model('User', userSchema)
module.exports = User
