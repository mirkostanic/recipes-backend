const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let interactionSchema = new Schema({
    recipe: {
        type: String
    },
    type: {
        type: String
    },
    value: {
        type: String
    }
}, {
    collection: 'interactions'
})

module.exports = mongoose.model('InteractionSchema', interactionSchema)