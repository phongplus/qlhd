const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/Auth')
const Chiphikhac = require('../models/Chiphikhac_Model')

// @route GET api/chiphikhac
// @desc Get chiphikhac
// @access Private
router.get('/', verifyToken, async(req, res) => {
    try {
        const DataChiphikhac = await Chiphikhac.find().populate('user', [//{ user: req.userId }
            'username'
        ])
        res.json({ success: true, DataChiphikhac })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

// @route POST api/posts
// @desc Create post
// @access Private
router.post('/', verifyToken, async(req, res) => {
    const { noidung, sotien, ghichu } = req.body

    // Simple validation
    if (!noidung)
        return res
            .status(400)
            .json({ success: false, message: 'Cần nhập nội dung' })

    try {
        const newChiphikhac = new Chiphikhac({
            noidung,
            sotien,
            ghichu,
            user: req.userId
        })

        await newChiphikhac.save()

        res.json({ success: true, message: 'Đã thêm chi phí khác', chiphikhac: newChiphikhac })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

// @route PUT api/chiphikhac
// @desc Update chiphikhac
// @access Private
router.put('/:id', verifyToken, async(req, res) => {
    const { noidung, sotien, ghichu } = req.body

    // Simple validation
    if (!noidung)
        return res
            .status(400)
            .json({ success: false, message: 'Cần nhập nội dung' })


    try {
        let updatedChiphikhac = {
            noidung,
            sotien,
            ghichu
        }

        const postUpdateCondition = { _id: req.params.id, user: req.userId }

        updatedChiphikhac = await Chiphikhac.findOneAndUpdate(
            postUpdateCondition,
            updatedChiphikhac, { new: true }
        )

        // User not authorised to update post or post not found
        if (!updatedChiphikhac)
            return res.status(401).json({
                success: false,
                message: 'Chiphikhac not found or user not authorised'
            })
        res.json({
            success: true,
            message: 'Cập nhật thành công!',
            chiphikhacs: updatedChiphikhac
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: 'Internal server error' })
    }
})

// @route DELETE api/posts
// @desc Delete post
// @access Private
router.delete('/:id', verifyToken, async(req, res) => {
    try {
        const chiphikhacDeleteCondition = { _id: req.params.id, user: req.userId }
        const deletedChiphikhac = await Chiphikhac.findOneAndDelete(chiphikhacDeleteCondition)

        // User not authorised or post not found
        if (!deletedChiphikhac)
            return res.status(401).json({
                success: false,
                message: 'Chi phí khác not found or user not authorised'
            })

        res.json({ success: true, message: 'Xóa thành công!', chiphikhac: deletedChiphikhac })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

module.exports = router