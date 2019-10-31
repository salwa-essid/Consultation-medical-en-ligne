const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

// create a schema for Dish
let UserSchema = new Schema({
    Id: String,
    Firstname: String,
    Lastname: String,
    Address: String,
    Email: String,
    Birth:String,
    Password: String,
    Phone: String,
    IsActive: Boolean,
    Role: String,
    Diploma: String,
    CreatedAt: Date,
    UpdatedAt: Date
});

// Create a model using schema
let User = mongoose.model("User", UserSchema);

// make this model available
module.exports = User;