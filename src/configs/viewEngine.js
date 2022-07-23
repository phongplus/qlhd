import express from "express";

const configViewEngine = (app) => {
    app.use(express.static('./src/public')) //cấu hình static file
    app.set("view-engine", "ejs"); //cấu hình Template engine ejs
    app.set("views", "./src/views") //Cấu hình thư mục chứa file Frontend
}

export default configViewEngine;