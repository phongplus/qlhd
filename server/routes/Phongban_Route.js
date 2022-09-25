const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/Auth')

const Phongban = require('../models/Phongban_Model')

// @route GET api/Phongbans
// @desc Get Phongbans
// @access Private
router.get('/view', verifyToken, async(req, res) => {
    try {
        const Phongbans = await Phongban.find({ user: req.userId }).populate('user', [
            'username'
        ])
        res.json({ success: true, Phongbans })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Lỗi kết nối đến máy chủ' })
    }
})

// @route Phongban api/Phongbans
// @desc Create Phongban
// @access Private
router.post('/insert', verifyToken, async(req, res) => {
    const { Tenphongban, Mandaychuan } = req.body

    // Simple validation
    if (!Tenphongban)
        return res
            .status(400)
            .json({ success: false, message: 'Tên phòng ban chưa được nhập' })

    try {
        const newPhongban = new Phongban({
            Tenphongban, Mandaychuan,
            user: req.userId
        })

        await newPhongban.save()

        res.json({ success: true, message: 'Thêm Phòng ban mới thành công!', Phongban: newPhongban })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Lỗi kết nối đến máy chủ!' })
    }
})

// @route PUT api/Phongbans
// @desc Update Phongban
// @access Private
router.put('/update/:id', verifyToken, async(req, res) => {
    const { Tenphongban, Mandaychuan } = req.body

    // Simple validation
    if (!Tenphongban)
        return res
            .status(400)
            .json({ success: false, message: 'Tên phòng ban chưa được nhập' })

    try {
        let updatedPhongban = {
            Tenphongban, 
            Mandaychuan
        }

        const PhongbanUpdateCondition = { _id: req.params.id, user: req.userId }

        updatedPhongban = await Phongban.findOneAndUpdate(
            PhongbanUpdateCondition,
            updatedPhongban, { new: true }
        )

        // User not authorised to update Phongban or Phongban not found
        if (!updatedPhongban)
            return res.status(401).json({
                success: false,
                message: 'Phongban không tồn tại hoặc người dùng chưa được xác thực'
            })

        res.json({
            success: true,
            message: 'Cập nhật thành công',
            Phongban: updatedPhongban
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Lỗi kết nối đến máy chủ!' })
    }
})

// @route DELETE api/Phongbans
// @desc Delete Phongban
// @access Private
router.delete('/delete/:id', verifyToken, async(req, res) => {
    try {
        const PhongbanDeleteCondition = { _id: req.params.id, user: req.userId }
        const deletedPhongban = await Phongban.findOneAndDelete(PhongbanDeleteCondition)

        // User not authorised or Phongban not found
        if (!deletedPhongban)
            return res.status(401).json({
                success: false,
                message: 'Phongban không tồn tại hoặc người dùng chưa được xác thực'
            })

        res.json({ success: true, Phongban: deletedPhongban })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Lỗi kết nối đến máy chủ' })
    }
})

module.exports = router