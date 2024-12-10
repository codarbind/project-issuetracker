// Do not change this file
require('dotenv').config();
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const Issue = require('./issue.model');

async function main(callback) {
    const URI = process.env.MONGO_URI; // Declare MONGO_URI in your .env file
    const client = mongoose.connect(URI,{ useNewUrlParser: true, useUnifiedTopology: true }) //new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const collections = {Issue}
    try {
        // Connect to the MongoDB cluster
       // await client.connect();
      
        // Make the appropriate DB calls
        await callback(collections);

    } catch (e) {
        // Catch any errors
        console.error(e);
        throw new Error('Unable to Connect to Database')
    }
}

module.exports = main;