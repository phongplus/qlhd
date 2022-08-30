const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/Auth')
const ChiPhiVon = require('../models/ChiPhiVon_Model')

// @route GET api/ChiPhiVon
// @desc Get ChiPhiVon
// @access Private
router.get('/', verifyToken, async(req, res) => {
    try {
        const ChiPhiVons = await ChiPhiVon.find({ user: req.userId }).populate('user', [
            'username'
        ])
        res.json({ success: true, ChiPhiVons })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

// @route POST api/ChiPhiVon
// @desc thêm  Create ChiPhiVon
// @access Private
router.post('/insert', verifyToken, async(req, res) => {
    const {
        giavon,
        giaban,
        giatridaura,
        ngay,
        diengiai,
        sotienKHtra,

        songay,
        laisuat,

        ghichu
    } = req.body
    let sotienTTNTP = req.body.giavon * 0.1
    let sotienhangconno = sotienTTNTP - req.body.sotienKHtra
    let chiphilaivay = (req.body.laisuat * req.body.songay * sotienhangconno) / 365


    // Simple validation
    if (!giavon || !giaban)
        return res
            .status(400)
            .json({ success: false, message: 'chưa nhập giá vốn hoặc giá bán' })

    try {
        const newChiPhiVon = new ChiPhiVon({
            giavon,
            giaban,
            giatridaura,
            ngay,
            diengiai,
            sotienKHtra,
            sotienTTNTP,
            sotienhangconno,
            songay,
            laisuat,
            chiphilaivay,
            ghichu,
            user: req.userId
        })

        await newChiPhiVon.save()

        res.json({ success: true, message: 'Thêm thành công ChiPhiVon', ChiPhiVon: newChiPhiVon })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

// @route PUT api/ChiPhiVon
// @desc Update ChiPhiVon
// @access Private
router.put('/:id', verifyToken, async(req, res) => {
    const {
        giavon,
        giaban,
        giatridaura,
        ngay,
        diengiai,
        sotienKHtra,

        songay,
        laisuat,

        ghichu
    } = req.body
    let sotienTTNTP = req.body.giavon * 0.1
    let sotienhangconno = sotienTTNTP - req.body.sotienKHtra
    let chiphilaivay = (req.body.laisuat * req.body.songay * sotienhangconno) / 365


    // Simple validation
    if (!giavon || !giaban)
        return res
            .status(400)
            .json({ success: false, message: 'chưa nhập giá vốn hoặc giá bán' })

    try {
        let updatedChiPhiVon = {
            giavon,
            giaban,
            giatridaura,
            ngay,
            diengiai,
            sotienKHtra,
            sotienTTNTP,
            sotienhangconno,
            songay,
            laisuat,
            chiphilaivay,
            ghichu
        }

        const ChiPhiVon_UpdateCondition = { _id: req.params.id, user: req.userId }

        updatedChiPhiVon = await ChiPhiVon.findOneAndUpdate(
            ChiPhiVon_UpdateCondition,
            updatedChiPhiVon, { new: true }
        )

        // User not authorised to update post or post not found
        if (!updatedChiPhiVon)
            return res.status(401).json({
                success: false,
                message: 'ChiPhiVon not found or user not authorised'
            })

        res.json({
            success: true,
            message: 'Excellent progress!',
            ChiPhiVon: updatedChiPhiVon
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

// @route DELETE api/ChiPhiVon
// @desc Delete ChiPhiVon
// @access Private
router.delete('/:id', verifyToken, async(req, res) => {
    try {
        const ChiPhiVon_DeleteCondition = { _id: req.params.id, user: req.userId }
        const deletedChiPhiVon = await ChiPhiVon.findOneAndDelete(ChiPhiVon_DeleteCondition)

        // User not authorised or post not found
        if (!deletedChiPhiVon)
            return res.status(401).json({
                success: false,
                message: 'ChiPhiVon  not found or user not authorised'
            })

        res.json({ success: true, Delete_ChiPhiVon: deletedChiPhiVon })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

module.exports = router