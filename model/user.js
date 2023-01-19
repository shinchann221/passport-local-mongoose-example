const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


const schema = new mongoose.Schema({
    email: { type: String, required: true, unique: true }
}, {
    timestamps: true
});


schema.plugin(passportLocalMongoose,{
    usernameField: "email",
    usernameUnique: true,

});

module.exports = mongoose.model('Users', schema);
