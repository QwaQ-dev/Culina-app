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


const recipeImagesStorage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const author = req.body.author;
        const path = `./uploads/users/${author}/recipes-imgs/`
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
    storage: recipeImagesStorage,
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

const uploadRecipeImagesMiddleware = uploadImages.array("recipeImages", 5);

const uploadRecipeImages = (req, res, next) => {
    uploadRecipeImagesMiddleware(req, res, (err) => {
        if(err){
            return res.status(500).json({
                message: "Error uploading recipe images!", 
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
    uploadRecipeImages
};