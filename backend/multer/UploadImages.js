const multer = require("multer");
const fs = require('fs-extra');

const avatarStorage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const username = req.body.username;
        const path = `users/${username}`;
        try {
            await fs.ensureDir(path);
            cb(null, path)
        } catch (error) {
            cb(error)
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const receiptsImagesStorage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const author = req.body.author;
        const path = `uploads/${author}/receipts-imgs/`;
        try {
            await fs.ensureDir(path);
            cb(null, path);
        } catch(error) {
            cb(error);
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === "image/jpeg"){
        cb(null, true)
    } else {
        cb(null, false)
    }
};

const uploadImages = multer({
    storage: receiptsImagesStorage,
    fileFilter: fileFilter
});

const uploadAvatar = multer({
    storage: avatarStorage,
    fileFilter: fileFilter
});

const uploadAvatarMiddleware = uploadAvatar.single("avatar");

const uploadUserAvatar = (req, res, next) => {
    uploadAvatarMiddleware(req, res, (err) => {
        if(err){
            return res.status(500).json({message: "Error uploading avatar!", error: err.message})
        }
        next();
    });
};

const uploadReceiptImagesMiddleware = uploadImages.array("receiptImages", 5);

const uploadReceiptImages = (req, res, next) => {
    uploadReceiptImagesMiddleware(req, res, (err) => {
        if(err){
            return res.status(500).json({
                message: "Error uploading receipt images!", 
                error: err.message});
        }
        let images = {};

        req.files.forEach((el, index) => {
            const url = `${el.destination}${el.filename}`;
            images[index + 1] = url;    
        })
    
        req.images = images;
        next();
    })
};

module.exports = {
    uploadUserAvatar,
    uploadReceiptImages
};