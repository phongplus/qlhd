var mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const chiphikhacSchema = mongoose.Schema({
    _id: {
        type: Number
    },
    noidung: {
        type: String,
        default: 'No Type'
    },
    sotien: {
        type: Number,
        default: 'No Type'
    },
    ghichu: {
        type: String,
        default: 'No Type'
    }
}, {
    _id: false,
    timestamp: true,
});

chiphikhacSchema.plugin(AutoIncrement);

module.exports = mongoose.model('chiphikhac', chiphikhacSchema, 'chiphikhac');