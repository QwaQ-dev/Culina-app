const Router = require("express");
const router = new Router();
const UserController = require("../controllers/userController");
const ReceiptController = require("../controllers/receiptController");

router.post('/username', UserController.newUsername);
router.post('/password', UserController.newPassword);
router.post('/sex', UserController.newSex);
router.get('/receipts/:author', ReceiptController.userReceipts); 

module.exports = router;