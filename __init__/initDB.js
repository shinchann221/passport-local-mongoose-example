const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.pluralize(null);
mongoose.set('strictQuery', true);

const MONGOURI = "mongodb://127.0.0.1/TestDB";

const connect = async () => {
    mongoose.connect(MONGOURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const db = mongoose.connection;
    db.on("error", () => {
        console.log("could not connect");
    });
    db.once("open", () => {
        console.log("> Successfully connected to database");
    });
};
module.exports = { connect };