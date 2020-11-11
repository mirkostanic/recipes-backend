const express = require('express');
const app = express();

// Express route
const interactionExpressRoute = express.Router();

// Interaction schema
const InteractionSchema = require('../models/interaction.model');

// Like recipe
interactionExpressRoute.route(['/like/:id', '/comment/:id', '/rate/:id']).post((req, res) => {

    // Validate request
    if(!req.body.value) {
        return res.status(400).json({
            message: "Interaction value can not be empty"
        });
    }

    // Instantiate interaction
    const interaction = new InteractionSchema({
        recipe: req.params.id, 
        type: req.body.type,
        value: req.body.value
    });

    // Save recipe
    interaction.save().then(data => {
        res.status(200).json(data);
    }).catch(error => {
        res.status(406).json({
            message: error.message || "Unknown error occurred while creating the entry."
        });
    });
});

module.exports = interactionExpressRoute;