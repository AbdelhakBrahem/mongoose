const mongoose = require('mongoose')
const validator = require('validator')

const personSchema = new mongoose.Schema({
    name:{
        String,
        required:true
    },
    age:Number,
    favoriteFoods:[String]

})

module.exports=mongoose.model('person',personSchema)
