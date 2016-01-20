var mongoose = require('mongoose');

var UserModel = mongoose.Schema({
        firstname : String,
        lastname : String,
        username : String,
        password : String,
        data_created : Date
});

var User = mongoose.model('User',UserModel);

module.exports = User;