const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/Auth')
const chiphithubaolanh = require('../models/Chiphithubaolanh_Model')

// @route GET api/Chiphithubaolanh
// @desc Get Chiphithubaolanh
// @access Private
router.get('/', verifyToken, async(req, res) => {
    try {
        const Chiphithubaolanh = await chiphithubaolanh.find({ user: req.userId }).populate('user', [
            'username'
        ])
        res.json({ success: true, Chiphithubaolanh })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

// @route POST api/chiphithubaolanh
// @desc thêm  Create chiphithubaolanh
// @access Private
router.post('/insert', verifyToken, async(req, res) => {
    const { noidung, giatrithubaolanh, sothang, tilephi, ghichu } = req.body
    let thanhtien = ((req.body.giatrithubaolanh * req.body.tilephi) / 12) * req.body.sothang
        // Simple validation
    if (!noidung)
        return res
            .status(400)
            .json({ success: false, message: 'Cần nhập nội dung' })

    try {
        const newChiphithubaolanh = new chiphithubaolanh({
            noidung,
            giatrithubaolanh,
            sothang,
            tilephi,
            thanhtien,
            ghichu,
            user: req.userId
        })

        await newChiphithubaolanh.save()

        res.json({ success: true, message: 'Thêm thành công chi phi thư bảo lãnh', Chiphithubaolanh: newChiphithubaolanh })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

// @route PUT api/chiphithubaolanh
// @desc Update chiphithubaolanh
// @access Private
router.put('/:id', verifyToken, async(req, res) => {
    const { noidung, giatrithubaolanh, sothang, tilephi, ghichu } = req.body
    let thanhtien = ((req.body.giatrithubaolanh * req.body.tilephi) / 12) * req.body.sothang
        // Simple validation
    if (!noidung)
        return res
            .status(400)
            .json({ success: false, message: 'Cần nhập nội dung' })

    try {
        let updatedChiphithubaolanh = {
            noidung,
            giatrithubaolanh,
            sothang,
            tilephi,
            thanhtien,
            ghichu
        }

        const Chiphithubaolanh_UpdateCondition = { _id: req.params.id, user: req.userId }

        updatedChiphithubaolanh = await chiphithubaolanh.findOneAndUpdate(
            Chiphithubaolanh_UpdateCondition,
            updatedChiphithubaolanh, { new: true }
        )

        // User not authorised to update post or post not found
        if (!updatedChiphithubaolanh)
            return res.status(401).json({
                success: false,
                message: 'Chiphithubaolanh not found or user not authorised'
            })

        res.json({
            success: true,
            message: 'Update Successful!',
            updatedChiphithubaolanh: updatedChiphithubaolanh //được sử dụng trong dev frontend
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

// @route DELETE api/chiphithubaolanh
// @desc Delete chiphithubaolanh
// @access Private
router.delete('/:id', verifyToken, async(req, res) => {
    try {
        const Chiphithubaolanh_DeleteCondition = { _id: req.params.id, user: req.userId }
        const deletedChiphithubaolanh = await chiphithubaolanh.findOneAndDelete(Chiphithubaolanh_DeleteCondition)

        // User not authorised or post not found
        if (!deletedChiphithubaolanh)
            return res.status(401).json({
                success: false,
                message: 'Chi phí thu bao lanh  not found or user not authorised'
            })

        res.json({ success: true, Delete_Chiphithubaolanh: deletedChiphithubaolanh })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

module.exports = router