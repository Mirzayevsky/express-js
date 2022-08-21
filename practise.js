const express = require("express")
const Joi = require("joi")
const  app = express()

const category = [
    {
        id:1,
        name:"Category one"
    },
    {
        id:2,
        name:"Category two"
    },
    {
        id:3,
        name:"Category three "
    }
]
//  http get metod
app.get('/api/category',(req,res) => {
 res.send(category)
})

//  http get metod with id
app.get('/api/category/:id',(req,res) => {
    const Item = category.find(item => item.id === req.body.id)
    if(!Item){
         res.status(404).send("Nothing found with this ID!")
    }
    res.send(Item)
 })

 
//  http post metod
 app.post('/api/category',(req,res) => {
  
 })