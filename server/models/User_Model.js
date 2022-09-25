const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	fullname: {
		type: String
	},
	email: {
		type: String
	},
	sex: {
		type: Number
	},
	roleId: {
		type: Number
	},
	role: {
		type: String
	},
	status: {
		type: Number
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('users', UserSchema)
