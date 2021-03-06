/*globals  require, exports */

var mongoose = require("mongoose");
// Function to establish connection for the Database
exports.connectToDb = function (callback) {
    // If the connection is already established, Then don't create one more connection
    if (mongoose.connection.readyState) {
        callback(undefined, { msg: "connected", code: 200 });
        return;
    }
    // Establish the DB connection
    mongoose.connect("mongodb://" + process.env.MONGO_HOST + "/consulting", { useNewUrlParser: true ,useUnifiedTopology:true });
    // Event for successfully connecting database
    mongoose.connection.on("connected", function () {
        console.log('connected')
    });
    // Event when there is an error connecting for database
    mongoose.connection.on("error", function (err) {
        console.log(err)
    });
};

exports.disconnect = function (callback) {
    mongoose.disconnect();
};