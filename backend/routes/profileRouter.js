const Router = require("express");
const router = new Router();
const UserController = require("../controllers/userController");
const RecipesController = require("../controllers/recipeController");

router.post('/username', UserController.newUsername);
router.post('/password', UserController.newPassword);
router.post('/sex', UserController.newSex);
router.get('/recipe/:author', RecipesController.userRecipes); 

module.exports = router;