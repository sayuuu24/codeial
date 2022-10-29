const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({email:{type:String,
required:true,
unique:true
},
password:{
    type:String,
    required:true
},
name:{
    type:String,
    required:true
}
},
{
    timestamps:true
});

const user = mongoose.model('user', userSchema);
module.exports = user;