const express = require('express');
const app = express();

// Express route
const recipeExpressRoute = express.Router();

// Recipe schema
const RecipeSchema = require('../models/recipe.model');

// Search by title
recipeExpressRoute.route('/search/:title').post((req, res) => {

    RecipeSchema.find({ title: req.params.title })
    .then(data => {
        if(!data) {
            return res.status(404).json({
                message: "Recipe not found with title " + req.params.title
            });            
        }
        res.status(200).json(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                message: "Recipe not found with title " + req.params.title
            });                
        }
        return res.status(406).json({
            message: "Error retrieving recipe with title " + req.params.title
        });
    });
    
});

// Create recipe
recipeExpressRoute.route('/create').post((req, res) => {

    // Validate request
    if(!req.body.description) {
        return res.status(400).json({
            message: "Recipe description can not be empty"
        });
    }

    // Instantiate recipe
    const recipe = new RecipeSchema({
        title: req.body.title || "Untitled recipe", 
        description: req.body.description,
        ingredients: req.body.ingredients,
        directions: req.body.directions
    });

    // Save recipe
    recipe.save().then(data => {
        res.json(data);
    }).catch(error => {
        res.status(406).json({
            message: error.message || "Unknown error occurred while creating the entry."
        });
    });
});

// Read recipe
recipeExpressRoute.route('/read/:id').get((req, res) => {

    // Find recipe
    RecipeSchema.findById(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).json({
                message: "Recipe not found with id " + req.params.id
            });            
        }
        res.status(200).json(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                message: "Recipe not found with id " + req.params.id
            });                
        }
        return res.status(406).json({
            message: "Error retrieving recipe with id " + req.params.id
        });
    });
});

// Update recipe
recipeExpressRoute.route('/update/:id').put((req, res) => {

    // Validate Request
    if(!req.body.description) {
        return res.status(400).json({
            message: "Recipe description can not be empty"
        });
    }

    // Find recipe and update
    RecipeSchema.findByIdAndUpdate(req.params.id, {
        title: req.body.title || "Untitled recipe", 
        description: req.body.description,
        ingredients: req.body.ingredients,
        directions: req.body.directions
    }, {new: true})
    .then(data => {
        if (!data) {
            return res.status(404).json({
                message: "Recipe not found with id " + req.params.id
            });
        }
        res.status(200).json(data);
    }).catch(error => {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                message: "Recipe not found with id " + req.params.id
            });                
        }
        return res.status(406).json({
            message: "Error updating recipe with id " + req.params.id
        });
    });
});

// Delete recipe
recipeExpressRoute.route('/delete/:id').delete((req, res) => {

    RecipeSchema.findByIdAndRemove(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).json({
                message: "Recipe not found with id " + req.params.id
            });
        }
        res.status(200).json({message: "Recipe deleted successfully!"});
    }).catch(error => {
        if(error.kind === 'ObjectId' || error.name === 'NotFound') {
            return res.status(404).json({
                message: "Recipe not found with id " + req.params.id
            });                
        }
        return res.status(406).json({
            message: "Could not delete recipe with id " + req.params.id
        });
    });
});

module.exports = recipeExpressRoute;