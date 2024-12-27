const Router = require("express");
const router = new Router();
const UserController = require("../controllers/UserController");

router.post('/sign-up', UserController.signUp);
router.post('/sign-in', UserController.signIn);
router.get('/auth', UserController.signIn);

module.exports = router;