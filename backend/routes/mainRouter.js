const Router = require("express");
const UsersController = require("../controllers/userController");
const CardController = require("../controllers/receiptController");
const router = new Router();
const UploadImages  = require('../multer/UploadImages')

router.post('/sign-up', UploadImages.uploadUserAvatar, UsersController.signUp);
router.post('/sign-in', UsersController.signIn);
router.post('/create-receipt', CardController.createReceipt);

router.get('/get-receipts', CardController.getAllReceipts);
router.get('/get-receipt/:id', CardController.getOneReceipt);   

module.exports = router;