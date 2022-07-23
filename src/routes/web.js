import express from "express";
import homeController from '../controllers/homeController'
import chiphikhacController from '../controllers/chiphikhacController'
let router = express.Router();
const initWebRouter = (app) => {
    //Hàm gọi Home page
    router.get('/', homeController.getHomepage);



    router.get('/navbar', (req, res) => {
        res.render('navbar.ejs')
    });
    router.get('/headercss', (req, res) => {
        res.render('headercss.ejs')
    });
    router.get('/pthd', (req, res) => {
        res.render('pthd.ejs')
    });
    /*===== routes xử lý form chi tiết hàng hóa */
    //route goi hiển thị chi tiết collection hàng hóa
    router.get('/chitiethanghoa', (req, res) => {
        res.render('chitiethanghoa.ejs')
    });
    // route goi pages add-hanghoa
    router.post('/add-hanghoa', (req, res) => {
        res.render('add-hanghoa.ejs');
    });

    /*========= routes xử lý chi phí vốn */
    router.get('/chiphivon', (req, res) => {
        res.render('chiphivon.ejs')
    });
    //route gọi trang add chi phí vốn
    router.get('/add-chiphivon', (req, res) => {
        res.render('add-chiphivon.ejs')
    });
    /*===== routes xử lý chi phí triển khai */
    router.get('/chiphitrienkhai', (req, res) => {
        res.render('chiphitrienkhai.ejs')
    });
    //route goi trang them chi phí triển khai
    router.get('/add-chiphitrienkhai', (req, res) => {
        res.render('add-chiphitrienkhai.ejs')
    });
    /* === Routes xử lý Form Manday kỹ sư */
    router.get('/mandaykysu', (req, res) => {
        res.render('mandaykysu.ejs')
    });
    //route goi trang them Manday kỹ sư
    router.get('/add-mandaykysu', (req, res) => {
        res.render('add-mandaykysu.ejs')
    });
    /* === Routes xử lý Form chi phí bảo lãnh */
    router.get('/chiphibaolanh', (req, res) => {
        res.render('chiphibaolanh.ejs')
    });
    //route goi trang them Manday kỹ sư
    router.get('/add-chiphibaolanh', (req, res) => {
        res.render('add-chiphibaolanh.ejs')
    });
    return app.use('/', router)
}

export default initWebRouter;