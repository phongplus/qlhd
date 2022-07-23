var express = require('express');
var router = express.Router();
import connectDB from '../configs/connectDB';
var chiphikhac = require('../models/chiphikhac');


let getChiPhiKhac = (req, res) => {
    console.log('>>>test route goi ham chi phi khác ')
        //viet logic
    chiphikhac.find({})
        .then(chiphikhacs => {
            return res.render('../views/chiphikhac.ejs', { chiphikhacs: chiphikhacs })
        })
        .catch(err => {
            console.log('Error: ', err);
            throw err;
        })
}


let getThemChiPhiKhac = (req, res) => {
        let newChiphi = new chiphikhac(req.body);
        newChiphi.save()
            .then(doc => {
                res.redirect('/chiphikhac')
            })
            .catch(err => {
                console.log('Error: ', err);
                throw err;
            })
    }
    /**
     * Go to Update Product page
     */
let loadUpdate = (req, res) => {
    //res.send('test Get updatedsdadasdas')
    chiphikhac.findById(req.params.chiphikhacId, (err, chiphikhac) => {
        if (err) {
            console.log(err);
            throw err
        }
        res.render('../views/admin/update-chiphikhac.ejs', { chiphikhac: chiphikhac });
    })
}


let update = (req, res) => {
    //res.send('test update')
    let chiphikhacId = req.params.chiphikhacId;
    chiphikhac.findByIdAndUpdate({ _id: chiphikhacId }, { $set: { noidung: req.body.noidung, sotien: req.body.sotien, ghichu: req.body.ghichu } }, { useFindAndModify: false })
        .then(doc => {
            res.redirect('/chiphikhac')
        })
}
let deleteChiphi = (req, res) => {
    //res.send('test Delete')
    let chiphikhacId = req.params.chiphikhacId;
    chiphikhac.findByIdAndDelete(chiphikhacId, (err, doc) => {
        if (err) throw err;
        res.redirect('/chiphikhac')
    })
}
export default {
    getChiPhiKhac,
    getThemChiPhiKhac,
    loadUpdate,
    update,
    deleteChiphi

}