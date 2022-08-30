const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/Auth')
const MandayKysu = require('../models/MandayKysu_Model')

// @route GET api/MandayKysu
// @desc Get MandayKysu
// @access Private
router.get('/', verifyToken, async(req, res) => {
    try {
        const MandayKysus = await MandayKysu.find({ user: req.userId }).populate('user', [
            'username'
        ])
        res.json({ success: true, MandayKysus })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

// @route POST api/MandayKysu
// @desc thêm  Create MandayKysu
// @access Private
router.post('/insert', verifyToken, async(req, res) => {
    const { hesotinhthanhtien,phongban, mandaychuan, songuoi, songaythuchien, ghichu } = req.body
    let thanhtien = req.body.hesotinhthanhtien * req.body.mandaychuan * req.body.songuoi * req.body.songaythuchien
        // Simple validation
    if (!phongban)
        return res
            .status(400)
            .json({ success: false, message: 'Cần nhập nội dung' })

    try {
        const newMandayKysu = new MandayKysu({
            phongban,
            mandaychuan,
            songuoi,
            songaythuchien,
            thanhtien,
            ghichu,
            user: req.userId
        })

        await newMandayKysu.save()

        res.json({ success: true, message: 'Thêm thành công MandayKysu', MandayKysu: newMandayKysu })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

// @route PUT api/MandayKysu
// @desc Update MandayKysu
// @access Private
router.put('/:id', verifyToken, async(req, res) => {
    const { phongban, mandaychuan, songuoi, songaythuchien, ghichu } = req.body
    let thanhtien = 22400 * req.body.mandaychuan * req.body.songuoi * req.body.songaythuchien
        // Simple validation
    if (!phongban)
        return res
            .status(400)
            .json({ success: false, message: 'Cần nhập nội dung' })

    try {
        let updatedMandayKysu = {
            phongban,
            mandaychuan,
            songuoi,
            songaythuchien,
            thanhtien,
            ghichu
        }

        const MandayKysu_UpdateCondition = { _id: req.params.id, user: req.userId }

        updatedMandayKysu = await MandayKysu.findOneAndUpdate(
            MandayKysu_UpdateCondition,
            updatedMandayKysu, { new: true }
        )

        // User not authorised to update post or post not found
        if (!updatedMandayKysu)
            return res.status(401).json({
                success: false,
                message: 'MandayKysu not found or user not authorised'
            })

        res.json({
            success: true,
            message: 'Excellent progress!',
            MandayKysu: updatedMandayKysu //được sử dụng dev trong frontend
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

// @route DELETE api/MandayKysu
// @desc Delete MandayKysu
// @access Private
router.delete('/:id', verifyToken, async(req, res) => {
    try {
        const MandayKysu_DeleteCondition = { _id: req.params.id, user: req.userId }
        const deletedMandayKysu = await MandayKysu.findOneAndDelete(MandayKysu_DeleteCondition)

        // User not authorised or post not found
        if (!deletedMandayKysu)
            return res.status(401).json({
                success: false,
                message: 'MandayKysu  not found or user not authorised'
            })

        res.json({ success: true, Delete_MandayKysu: deletedMandayKysu })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

module.exports = router