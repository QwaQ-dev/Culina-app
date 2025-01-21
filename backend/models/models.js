const sequelize = require("../db/db");
const { DataTypes } = require("sequelize");

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    e_mail: {
        type: DataTypes.STRING, 
        unique: true
    },
    username: {
        type: DataTypes.STRING, 
        unique: true
    },
    password: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.STRING, 
        defaultValue:"Basic"
    },
    sex: {
        type: DataTypes.STRING, 
        defaultValue:"male"
    },
    recipes_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

const Recipes = sequelize.define('recipes', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING, 
        unique: true
    },
    descr: {
        type: DataTypes.STRING
    },
    diff: {
        type: DataTypes.STRING
    },
    filters: {
        type: DataTypes.JSONB
    },
    imgs: {
        type: DataTypes.JSONB
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ingredients: {
        type: DataTypes.JSONB,
    },
    steps: {
        type: DataTypes.JSONB,
    }
});

const Reviews = sequelize.define('reviews', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true,
    },
    review_text: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    rating_value: {
        type: DataTypes.INTEGER, 
        allowNull: true,
        validate: {min: 1, max: 5}
    },
    reviewed_by: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});



Recipes.hasMany(Reviews, { foreignKey: 'recipe_id', as: 'reviews' });
Reviews.belongsTo(Recipes, { foreignKey: 'recipe_id', as: 'recipe' });

module.exports = {
    User,
    Recipes,
    Reviews
}