var User = require('../model/UserModel');

module.exports = function(app,encrypt,passport){
    app.post('/apiv1/user/create',create);
    app.post('/apiv1/user/login',login);

    function create(req,res){
        var userInfo = req.body;
        var newUser  = new User({
            firstname : userInfo.firstname,
            lastname : userInfo.lastname,
            username : userInfo.username,
            password : encrypt(userInfo.password),
            data_created : new Date()
        });

        getByUsername(userInfo.username,function(user){
            console.log(user)
            if(!user){
                newUser.save(newUser,function(err,doc){
                    if(err) throw err;
                    res.json(doc);
                }); 
            }else{
                res.json({message : "User already exists!"});
            }
        });
    }

    function login(req,res){
        var userInfo = req.body;
        User.find({
            username : userInfo.username,
            password : encrypt(userInfo.password)
        }, function (err, user){
            if(err) throw err;
            res.json(user);
        });
    }


    function getByUsername(username,callback){
        var userData = undefined;
        User.find({username : username},function(err,user){
            if(err) throw err;
            userData = user.length;
        });
        callback(userData);
    }
}