const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MandayKysuSchema = new Schema({
    TygiaUSD: {
        type: Number,
        required: true
    },
    phongban: {
        type: String,
        required: true
    },
    mandaychuan: {
        type: Number,
        required: true
    },
    songuoi: {
        type: Number,
        required: true
    },
    songaythuchien: {
        type: Number,
        required: true
    },
    thanhtien: {
        type: Number,
        required: true
    },
    ghichu: {
        type: String
    },
    crateAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = mongoose.model('MandayKysu', MandayKysuSchema)