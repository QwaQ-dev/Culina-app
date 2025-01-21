const Typesense = require("typesense");
const { Recipes } = require('../models/models');

const client = new Typesense.Client({
    'nodes': [{
        'host': 'typesense',
        'port': '8108',
        'protocol': 'http',
    }],
    'apiKey': 'xyz',  
    'connectionTimeoutSeconds': 10,
});


async function createCollectionIfNotExist() {
    try {
        const collections = await client.collections().retrieve();
        const collectionExists = collections.some(col => col.name === 'recipes');
        if (!collectionExists) {
            console.log('Creating collection "recipes"...');
            const schema = {
                'name': 'recipes',
                'fields': [
                    { 'name': 'id', 'type': 'string' },
                    { 'name': 'name', 'type': 'string' },
                    { 'name': 'descr', 'type': 'string' },
                    { 'name': 'diff', 'type': 'string' },
                    { 'name': 'filters', 'type': 'string[]' },
                    { 'name': 'imgs', 'type': 'string[]' },
                    { 'name': 'author', 'type': 'string' },
                    { 'name': 'ingredients', 'type': 'string[]' }
                ]
            };
            await client.collections().create(schema);
            console.log('Collection "recipes" created');

            await new Promise(resolve => setTimeout(resolve, 10000));
        }
    } catch (error) {
        console.error('Error checking or creating collection:', error);
    }
}


async function typesenseFill() {
    try {
        await createCollectionIfNotExist();
        
        const recipesFromDB = await Recipes.findAll();
        const formattedRecipes = recipesFromDB.map((recipe) => ({
            name: recipe.name,
            descr: recipe.descr,
            diff: recipe.diff,
            filters: JSON.parse(recipe.filters),
            imgs: Object.values(recipe.imgs),
            author: recipe.author,
            ingredients: recipe.ingredients
        }));

        const result = await client.collections('recipes').documents().import(formattedRecipes, { action: 'create' });
        console.log("Documents added to Typesense:", result);
    } catch (error) {
        console.error("Error while adding documents to Typesense:", error);
    }
}

async function deleteTypesense() {
    try {
        const del = await client.collections('recipes').delete();
        console.log("Collection 'recipes' deleted.");
    } catch (error) {
        console.error("Error while deleting collection:", error);
    }
}

async function retrive() {
    try {
        const retrive = await client.collections('recipes').retrieve();
        console.log("Collection schema:", retrive);
    } catch (error) {
        console.error("Error while retrieving collection:", error);
    }
}

// Экспорт функций
module.exports = {
    client,
    typesenseFill,
    deleteTypesense,
    retrive,
    createCollectionIfNotExist
};