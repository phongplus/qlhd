const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChiPhiVonSchema = new Schema({
    giavon: {
        type: Number,
        required: true
    },
    giaban: {
        type: Number,
        required: true
    },
    giatridaura: {
        type: Number,
        required: true
    },
    ngay: {
        type: Date,
        default: Date.now
    },
    diengiai: {
        type: String,
        required: true
    },
    sotienKHtra: {
        type: Number,
        required: true
    },
    sotienTTNTP: {
        type: Number,
        required: true
    },
    sotienhangconno: {
        type: Number,
        required: true
    },
    songay: {
        type: Number,
        required: true
    },
    laisuat: {
        type: Number,
        required: true
    },
    chiphilaivay: {
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

module.exports = mongoose.model('ChiPhiVon', ChiPhiVonSchema)