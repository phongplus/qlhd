const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chiphikhacSchema = new Schema({
    noidung: {
        type: String,
        required: true
    },
    sotien: {
        type: Number,
        required: true
    },
    ghichu: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = mongoose.model('chiphikhac', chiphikhacSchema)