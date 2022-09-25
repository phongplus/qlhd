const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PhongbanSchema = new Schema({
	Tenphongban: {
		type: String,
		required: true
	},
	Mandaychuan: {
		type: Number
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	}
})

module.exports = mongoose.model('Phongbans', PhongbanSchema)
