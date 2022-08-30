const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChiTietHangHoaSchema = new Schema({
    tenhang: {
        type: String,
        required: true
    },
    soluong: {
        type: Number,
        required: true
    },
    dongiaFOB: {
        type: Number,
        required: true
    },
    dongiakho: {
        type: Number,
        required: true
    },
    thanhtiengiakho: { //cần tính
        type: Number,
        required: true
    },
    dongiaban: {
        type: Number,
        required: true
    },
    thanhtiengiaban: { //cần tính
        type: Number,
        required: true
    },
    ghichu: {
        type: String,
        required: true
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

module.exports = mongoose.model('ChiTietHangHoa', ChiTietHangHoaSchema)