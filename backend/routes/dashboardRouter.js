const Router = require("express");
const ReceiptController = require("../controllers/receiptController");
const router = new Router();
const UploadImages  = require('../multer/UploadImages');

router.post('/create-receipt', UploadImages.uploadReceiptImages, ReceiptController.createReceipt);
router.get('/receipts', ReceiptController.allReceipts);
router.get('/receipt/:id', ReceiptController.oneReceipt);   

module.exports = router;