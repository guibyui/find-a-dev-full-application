const mongoose = require('mongoose');
const PointSchema = require('./utils/PointsSchema');

// Structure of a entity in a database
const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dsphere',
    }
});

module.exports = mongoose.model('Dev', DevSchema);

// Entities of the application