const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

// create a schema for Dish
let RDVSchema = new Schema({
    Id: String,
    date: Date,
    PsyId: String,
    PassId: String,
    Email: String,
    Type: String,
    State: Boolean,
    CreatedAt: Date,
    UpdatedAt: Date
});

// Create a model using schema
let RDV = mongoose.model("RDV", RDVSchema);

// make this model available
module.exports = RDV;