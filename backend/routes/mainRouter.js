const Router = require("express");
const UsersController = require("../controllers/userController");
const CardController = require("../controllers/receiptController");
const router = new Router();
const multer = require("multer")

const storageCongfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "receipts-images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === "image/jpeg"){
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({storage:storageCongfig, fileFilter: fileFilter});

router.post('/sign-up', UsersController.signUp);
router.post('/sign-in', UsersController.signIn);
router.post('/create-receipt', upload.array("files", 6), CardController.createReceipt);

router.get('/get-receipts', CardController.getAllReceipts);
router.get('/get-receipt/:id', CardController.getOneReceipt);   

module.exports = router;