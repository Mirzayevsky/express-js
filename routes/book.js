const express = require("express")
const Joi = require("joi")
const router = express.Router()

const books = [
    {id:1,name:"first book"},
    {id:2,name:"second book "},
    {id:3,name:"third book"}
]

router.get("/", (req, res) => {
  res.send(books)
})

// http protocolning post metodi

router.post("/", (req, res) => {
  const {error} = validateBook(req.body)
  if(error){
    return res.status(400).send(error.details[0].message)
  }
    const book = {
        id: books.length + 1,
        name:req.body.name
    }
    books.push(book)
    res.status(201).send(book)
})
// http protocolning get metodi

router.get("/:id", (req, res) => {
    const book = books.find(b => b.id ===  parseInt(req.params.id)) 
    if(!book) {
        res.status(404).send("berilgan IDga teng bolgan kitob topilmadi")
    }
  res.send(book)
})

// http protocolning put metodi

router.put('/:id/', (req, res) => {
    const book = books.find(b => b.id ===  parseInt(req.params.id)) 
    if(!book)  {
      return  res.status(404).send("berilgan IDga teng bolgan kitob topilmadi")
    }
    const {error} = validateBook(req.body)

    if(error){
      return res.status(400).send(error.details[0].message)
    }

    // update book
      book.name = req.body.name;
    // returing book to user
      res.send(book)
})

router.delete('/:id', (req , res) => {
  // we should find book with id if book not found return 404 status
  const book = books.find(b => b.id ===  parseInt(req.params.id)) 
  if(!book)  res.status(404).send("berilgan IDga teng bolgan kitob topilmadi")
  // if book found then delate this book and return book
  const bookIndex = books.indexOf(book)
  books.splice(bookIndex,1)
  res.send(book)
})

function validateBook (book) {
  const bookSchema = { name:Joi.string().required().min(3) }
   return Joi.validate(book, bookSchema)
}

module.exports = router;