const db = require('../db/db');
const multer = require('multer');

class ReceiptController{
    async getAllReceipts(req, res){

    };

    async createReceipt(req, res){
        const {name, descr, diff, filters, author} = req.body;
        const images = req.files;
        
        res.status(500).json({name, descr, diff, filters, author, images})

    };  

    async getOneReceipt(req, res){
        const id = req.params
    };
}

module.exports = new ReceiptController();