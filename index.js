const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const dbConfig = require('./db/database');
const cors = require('cors');

// Set up DB
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log('Database connected.');
}).catch(error => {
    console.log('Database could not be connected: ' + error);
});

// Set up express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

// API root
const recipeRoute = require('./routes/recipe.routes')
app.use('/api/recipe', recipeRoute)
const interactionRoute = require('./routes/interaction.routes')
app.use('/api/interaction', interactionRoute)

// Port
const port = 8080;

// Start server
const server = app.listen(port, () => {
    console.log('Recipe server listening at: ' + port)
})

// Find 404 and hand over to error handler
app.use((req, res, next) => {
    res.status(404).json({
        message: "Invalid route."
    });
});

// Index route
app.get('/', (req, res) => {
    res.status(404).json({
        message: "Invalid route."
    });
});

// Static build location
app.use(express.static(path.join(__dirname, 'dist')));