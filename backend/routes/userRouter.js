const Router = require("express");
const router = new Router();
const UserController = require("../controllers/UserController");
const AuthMiddleware = require("../middleware/authMiddleware")

router.post('/sign-up', UserController.signUp);
router.post('/sign-in', UserController.signIn);
router.get('/auth', AuthMiddleware, UserController.check);

module.exports = router;