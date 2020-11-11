const mongoose = require("mongoose");
const Recipe = require('../models/recipe.model');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();

chai.use(chaiHttp);

describe('Recipe', () => {

    beforeEach((done) => {
        Recipe.remove({}, (error) => {
           done();
        });
    });

    // Test the create route
    describe('/POST recipe', () => {
        let recipe = {
            title: "Some cake", 
            description: "Cakey cake.",
            ingredients: "2kg of cake stuff.",
            directions: "Bake for 4 hours."
        }
        it('it should create a recipe entry', (done) => {
            chai.request(server)
                .post('/api/recipe/create')
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                done();
            });
        });
    });

    // Test the find route
    describe('/GET recipe', () => {
        it('it should read a single recipe', (done) => {
            chai.request(server)
                .get('/api/recipe/search/Some%20cake')
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                done();
            });
        });
    });

});