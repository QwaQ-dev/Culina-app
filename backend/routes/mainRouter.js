const Router = require("express");
const UsersController = require("../controllers/userController");
const router = new Router();

router.get('/users/:id}', UsersController.getUser);

module.exports = router;