const Router = require("express");
const ReceiptController = require("../controllers/receiptController");
const router = new Router();
const UploadImages  = require('../multer/UploadImages.js');

router.post('/create-receipt', UploadImages.uploadReceiptImages, ReceiptController.createReceipt);
router.post('/add-review', ReceiptController.addReview);  

router.get('/search-receipts/:query', ReceiptController.searchReceipts);
router.get('/receipts', ReceiptController.allReceipts);
router.get('/receipt/:id', ReceiptController.oneReceipt); 

module.exports = router;