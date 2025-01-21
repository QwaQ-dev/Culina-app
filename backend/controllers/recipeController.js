const { Recipes, Reviews } = require("../models/models");
const { client, retrive } = require('../search/Typesense');

class RecipesController{
    async createRecipe(req, res){
        const {name, descr, diff, filters, author, steps, ingredients} = req.body;
        const imagesUrl = req.images;

        const ingredientsArray = JSON.parse(ingredients).map(item => 
            `${item.ingredient_name}: ${item.quantity}`
        );

        const stepArray = JSON.parse(steps).map(item => 
            `${item.step_number}: ${item.step_description}`
        );

        if(!imagesUrl) {
            return res.status(500).json({message: "Error uploading images"})
        }
    
        try {
            // Создание рецепта в базе данных
            const newRecipe = await Recipes.create({
                name,
                descr,
                diff,
                filters,
                imgs: imagesUrl,
                author,
                ingredients: ingredientsArray,
                steps: stepArray
            });
            console.log('New recipe created:', newRecipe.dataValues);

            try {
                // Отправляем данные в Typesense
                const type = await client.collections('recipes').documents().create({
                    id: newRecipe.id.toString(),
                    name: name,
                    descr: descr,
                    diff: diff,
                    filters: Array.isArray(filters) ? filters : JSON.parse(filters),
                    imgs: Array.isArray(imagesUrl) ? imagesUrl : Object.values(imagesUrl),
                    author: author,
                    ingredients: ingredientsArray, // передаем как массив
                });
                
                await retrive();
                console.log('Document added to Typesense:', type);
            } catch (error) {
                console.error('Error adding document to Typesense:', error.response?.data || error.message);
                return res.status(500).json({
                    message: "Error with adding recipe to Typesense",
                    error: error.message,
                });
            }
    
            return res.status(200).json({ message: "recipe added" });
    
        } catch (error) {
            return res.status(500).json({
                message: "Error with adding recipe",
                error: error.message
            });
        }
    }

    async oneRecipe(req, res){
        const recipeId = req.params.id;

        try {
            const recipe = await Recipes.findOne({
                where: { id: recipeId },
                include: [
                    {
                        model: Reviews,
                        as: 'reviews'
                    },
                ],
            });

            if(!recipe) {
                return res.status(500).json({message: "No recipe with this id"});
            } 
            
            return res.status(200).json(recipe);
        } catch (error) {
            return res.status(500).json({message: "Error with getting card by id", error: error.message});
        }
    };

    async addReview(req, res) {
        const { reviewText, recipeId, ratingValue, reviwedBy } = req.body;

        try {
            await Reviews.create({
                recipe_id: recipeId,
                review_text: reviewText,
                rating_value: ratingValue,
                reviewed_by: reviwedBy   
            })

            return res.status(200).json({message: "Review has been added"});
        } catch (error) {
            return res.status(500).json({message: "Error with adding review", error: error.message});
        }
    }

    async allRecipes(req, res){
        try {
            const request = await Recipes.findAll();
            let recipe = [];

            request.forEach((el) => {
                recipe.push(el);
            });

            return res.status(200).json(recipe)
        } catch (error) {
            return res.status(500).json({message: "Error with getting all recipe", error: error.message});
        }
    };

    async userRecipes(req, res){
        const author = req.params.author;

        try {
            const request = await Recipes.findAll({
                where: {
                    author: author
                }
            });

            if(request.length === 0){
                return res.status(500).json({message: "This user has no recipes yet"})
            } else {
                let recipes = [];

                request.forEach((el) => {
                    recipes.push(el);
                });

                return res.status(200).json(recipes);
            }
            
        } catch (error) {
            return res.status(500).json({message: "Error with getting user recipes", error: error.message});
        };
    };

    async searchRecipes(req, res) { 
        const query = req.params.query;  
        try {
            const searchParams = {
                'q': query, 
                'query_by': 'name,descr,author'  
            };
        
            const search = await client.collections('recipe').documents().search(searchParams);
    
            if (search.hits && search.hits.length > 0) {
                const recipes = search.hits.map(hit => hit.document);
                return res.status(200).json(recipes);
            } else {
                return res.status(404).json({ message: "No recipes found" });
            }
        } catch (error) {
            console.error("Error with searching:", error);
            return res.status(500).json({ message: "Error with searching", error: error.message });
        }
    }
}

module.exports = new RecipesController();