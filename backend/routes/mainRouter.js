const Router = require("express");
const UserController = require("../controllers/UserController");
const CardController = require("../controllers/ReceiptController");
const router = new Router();
const UploadImages  = require('../multer/UploadImages')

router.post('/sign-up', UserController.signUp);
router.post('/sign-in', UserController.signIn);
router.post('/create-receipt', UploadImages.uploadReceiptImages, CardController.createReceipt);

router.get('/dashboard/receipts', CardController.allReceipts);
router.get('/dashboard/receipt/:id', CardController.oneReceipt); 
router.get('/profile/receipts/:author', CardController.userReceipts);   

module.exports = router;