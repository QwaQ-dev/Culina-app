const Router = require("express");
const UsersController = require("../controllers/userController");
const router = new Router();


router.post('/sign-up', UsersController.signUp);
router.post('/sign-in', UsersController.signIn);

module.exports = router;