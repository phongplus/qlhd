import express from "express";
import chiphikhacController from '../controllers/chiphikhacController'
let router = express.Router();
const initchiphikhac = (app) => {
    //=====Routes xử lý chi phí khác 
    //Load dữ liệu model Chi phí khác
    router.get('/chiphikhac', chiphikhacController.getChiPhiKhac);
    //Load trang add chi phi
    router.get('/add-chiphikhac', (req, res) => {
        res.render('./admin/add-chiphikhac.ejs')
    });
    //Goi ham thực hiện thêm chi phí
    router.post('/themchiphi', chiphikhacController.getThemChiPhiKhac);
    //Load trang update
    router.get('/load-update/:chiphikhacId', chiphikhacController.loadUpdate);
    //Thực thi update
    router.post('/update/:chiphikhacId', chiphikhacController.update);
    //Thực thi delete
    router.get('/deletechiphi/:chiphikhacId', chiphikhacController.deleteChiphi);

    return app.use('/', router)
}

export default initchiphikhac;