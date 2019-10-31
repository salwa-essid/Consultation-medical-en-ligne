var  User = require("../models/User");

//AddUser
exports.AddUser = (userEntity,callback)=>{
    User.create(userEntity,function(err,user){
        callback(err,user)
    })
}

//Delete
exports.DeleteUserById = (id,callback)=>{
    User.remove({Id: id},function(err,success){
        callback(err,success)
    })
}

//get by id

exports.GetUserById = (id, callback)=> {
    // Fetch the dish inforation
    User.find({Id: id }, function (err, user) {
        callback(err, user);
    });
};

exports.DeleteByCreteria= (createria,callback)=>{
    User.remove(createria,function(err,success){
        callback(err,success)
    })
}

exports.ListByRole = (role,callback)=>{
    User.find({Role: role},function(err,list){
        callback(err,list)
    })
}

exports.getByCreteria = (creteria,callback) => {
    User.find(creteria,(err,user)=>{
        callback(err,user)
    })
}

exports.login=(loginEntity,role,callback) =>{
    User.find({
        $and: [{
            Email: loginEntity.Email
        }, {
            Password: loginEntity.Password
        },
        {
            Role: role
        }]
    }, (err, rdvs) => {
        callback(err, rdvs)
    })
}

//update

exports.updateUser = function (user, callback) {
    User.updateOne({ 'Id': user.Id }, user, function (err, user) {
        callback(err, user);
    });
}





