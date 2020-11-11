const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let recipeSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    ingredients: {
        type: String
    },
    directions: {
        type: String
    }
}, {
    collection: 'recipes'
})

module.exports = mongoose.model('RecipeSchema', recipeSchema)