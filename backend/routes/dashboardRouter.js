const Router = require("express");
const RecipesController = require("../controllers/recipeController.js");
const router = new Router();
const UploadImages  = require('../multer/UploadImages.js');
const FiltersController = require('../controllers/filterController.js');

router.post('/create-recipe', UploadImages.uploadRecipeImages, RecipesController.createRecipe);
router.post('/add-review', RecipesController.addReview);  
router.post('/filter', FiltersController.filterBy);

router.get('/search-recipes/:query', RecipesController.searchRecipes);
router.get('/recipes', RecipesController.allRecipes);
router.get('/recipe/:id', RecipesController.oneRecipe); 

module.exports = router;