const User = require('../models/user');
module.exports.profile = function(req,res)
{
    //return res.end('<h1> UserProfile </h1>');
    return res.render('user_profile', {title:"User Profile"});
}
//render the sign up page

module.exports.signUp = function(req,res)
{
    return res.render('sign_up',{
        title:"Codial | Sign Up"
    })
}
//render the sign in page

module.exports.signIn = function(req,res)
{
    return res.render('user_sign_in',{
        title: "Codeail | Sign In"
    })
}
//get the sign up data
    module.exports.create = function(req,res)
    {
        //console.log(req.body);
        if(req.body.password != req.body.confirm_password)
        {
             return res.redirect('back');
        }
        console.log(req.body.email);
        User.findOne({email: req.body.email}, function(err,user)
        {
            console.log(user);
            if(err){console.log('error in finding user in signing up'); return}
            if(!user){
                User.create(req.body, function(err, user){
                    if(err){console.log('error in creating user in signing up'); return}
                    return res.redirect('/users/sign-in');
                })
                 
            }
            else{ 
                return res.redirect('back');
            }
    });
}  

//get the sign in data
module.exports.createSession = function(req,res)
{
    console.log(req.body);
    User.findOne({email: req.body.email}, function(err,user)
    {
        if(err){console.log('error in finding user in signing up'); return}
        if(user){

          //handle password if doesnt match

            if(user.password != req.body.password){
                return res.redirect('back');
            }

            //handle session creation

            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');

        }else{
             //handle user not found

            return res.redirect('back');
         }
    });

}
module.exports.profile = function(req, res)
{
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user)
        {
            if(user){
                return res.render('user_profile',{
                    title:"User profile", 
                    user:user
                })
                }return res.redirect('/users/sign-in');
            });
        }else{
            return res.redirect('/users/sign-in');
        }
    }
    module.exports.destroySession = function(req,res)
    {
        req.logout(req.user, err => {
            if(err) return next(err);
            res.redirect("/");
    })

}