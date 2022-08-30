const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/Auth')
const ChiTietHangHoa = require('../models/ChiTietHangHoa_Model')

// @route GET api/ChiTietHangHoa
// @desc Get ChiTietHangHoa
// @access Private
router.get('/', verifyToken, async(req, res) => {
    try {
        const ChiTietHangHoas = await ChiTietHangHoa.find({ user: req.userId }).populate('user', [
            'username'
        ])
        res.json({ success: true, ChiTietHangHoas })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

// @route POST api/ChiTietHangHoa
// @desc thêm  Create ChiTietHangHoa
// @access Private
router.post('/insert', verifyToken, async(req, res) => {

    const {
        tenhang,
        soluong,
        dongiaFOB,
        dongiakho,
        //thanhtiengiakho, cần tính
        dongiaban,
        //thanhtiengiaban, cần tính
        ghichu
    } = req.body
    let thanhtiengiakho = req.body.soluong * req.body.dongiakho
    let thanhtiengiaban = req.body.soluong * req.body.dongiaban
        // Simple validation
    if (!tenhang)
        return res
            .status(400)
            .json({ success: false, message: 'Cần nhập tên hàng' })

    try {
        const newChiTietHangHoa = new ChiTietHangHoa({
            tenhang,
            soluong,
            dongiaFOB,
            dongiakho,
            thanhtiengiakho, //cần tính
            dongiaban,
            thanhtiengiaban, //cần tính
            ghichu,
            user: req.userId
        })

        await newChiTietHangHoa.save()

        res.json({ success: true, message: 'Thêm thành công ChiTietHangHoa', ChiTietHangHoa: newChiTietHangHoa })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

// @route PUT api/ChiTietHangHoa
// @desc Update ChiTietHangHoa
// @access Private
router.put('/:id', verifyToken, async(req, res) => {
    const {
        tenhang,
        soluong,
        dongiaFOB,
        dongiakho,
        //thanhtiengiakho, cần tính
        dongiaban,
        //thanhtiengiaban, cần tính
        ghichu
    } = req.body
    let thanhtiengiakho = req.body.soluong * req.body.dongiakho
    let thanhtiengiaban = req.body.soluong * req.body.dongiaban
        // Simple validation
    if (!tenhang)
        return res
            .status(400)
            .json({ success: false, message: 'Cần nhập tên hàng' })

    try {
        let updatedChiTietHangHoa = {
            tenhang,
            soluong,
            dongiaFOB,
            dongiakho,
            thanhtiengiakho, //cần tính
            dongiaban,
            thanhtiengiaban, //cần tính
            ghichu
        }

        const ChiTietHangHoa_UpdateCondition = { _id: req.params.id, user: req.userId }

        updatedChiTietHangHoa = await ChiTietHangHoa.findOneAndUpdate(
            ChiTietHangHoa_UpdateCondition,
            updatedChiTietHangHoa, { new: true }
        )

        // User not authorised to update post or post not found
        if (!updatedChiTietHangHoa)
            return res.status(401).json({
                success: false,
                message: 'ChiTietHangHoa not found or user not authorised'
            })

        res.json({
            success: true,
            message: 'Excellent progress!',
            ChiTietHangHoa: updatedChiTietHangHoa
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

// @route DELETE api/ChiTietHangHoa
// @desc Delete ChiTietHangHoa
// @access Private
router.delete('/:id', verifyToken, async(req, res) => {
    try {
        const ChiTietHangHoa_DeleteCondition = { _id: req.params.id, user: req.userId }
        const deletedChiTietHangHoa = await ChiTietHangHoa.findOneAndDelete(ChiTietHangHoa_DeleteCondition)

        // User not authorised or post not found
        if (!deletedChiTietHangHoa)
            return res.status(401).json({
                success: false,
                message: 'ChiTietHangHoa  not found or user not authorised'
            })

        res.json({ success: true, Delete_ChiTietHangHoa: deletedChiTietHangHoa })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

module.exports = router