const express=require('express')
const mongoose = require('mongoose')
const person = require('./models/person');

require('dotenv').config({path:'/.config/.env'})

const app =express()
mongoose.connect(process.env.DB_URI,{useNewUrlParser: true,useCreateIndex: true,useFindAndModify:false,useUnifiedTopology: true},(err)=>{
    if (err)
        throw err;
    console.log('db connected...')
})

//new person

app.post('/newperson',(req,res)=>{

    const {name,age,favoriteFoods}=req.body
    const newPerson = new person({
        name ,
        age ,
        favoriteFoods 
    });
       newPerson
         .save()
         .then((data) => res.status(200).json(data))
         .catch((err) => res.status(400).json(err));
 });

//find

person.find((err,data)=>{
    if (err) throw err
    console.log(data)
}

//Find by food

person.findOne({favouriteFoods:{$in:['pizza']}})
.then((data)=>console.log(data))
.catch((err)=>console.log(err))


person.findById('6092777bb9e4a71dd8dfb484', (error ,data)=>{
    if (error) {
    console.log(error)
  }
  else {
    console.log(data)
  }
})

person.findOne({name:'Abdelhak'},(error ,data)=>{
    if (error) {
    console.log(error)
  }
  else {
    data.favoriteFoods.push('hamburger')
    console.log(data)
  }
  })

  // updating age 
  person.findOneAndUpdate({name : 'Abdou'}, {age : 27}, (error ,data)=>{
    if (error) {
    console.log(error)
  }
  else {
    console.log(data)
  }
})
  
  
  person.findOneAndRemove({name:'Jhon'},(error ,data)=>{
    if (error) {
    console.log(error)
  }
  else {
    console.log(data)
  }
})
  
  
  
  person.find({favoriteFoods:{$all:['burritos']}})
  .select('-age')
  .limit(2)
  .sort({name :'asc' })
  .exec((error,data)=>{
    if(!error){
      console.log(data)
    }
})


app.listen(6000,()=>{
    console.log('mconecti')
})