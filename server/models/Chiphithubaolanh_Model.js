const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChiphithubaolanhSchema = new Schema({
    noidung: {
        type: String,
        required: true
    },
    giatrithubaolanh: {
        type: Number,
        required: true
    },
    sothang: {
        type: Number,
        required: true
    },
    tilephi: {
        type: Number,
        required: true
    },
    thanhtien: {
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

module.exports = mongoose.model('chiphithubaolanh', ChiphithubaolanhSchema)