const express = require("express")
const Joi = require("joi")
const helmet = require("helmet")
const morgan = require("morgan")

const app = express()
app.use(express.json())
// urlencoded type data convert json 
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(helmet())
app.use(morgan("tiny"))



const books = [
    {id:1,name:"first book"},
    {id:2,name:"second book "},
    {id:3,name:"third book"}
]

app.get("/",(req,res) =>  {
 res.send("hi")
})

app.get("/api/books", (req, res) => {
  res.send(books)
})

// http protocolning post metodi

app.post("/api/books", (req, res) => {

  const {error} = validateBook(req.body)
  if(error){
    res.status(400).send(error.details[0].message)
  }
    const book = {
        id: books.length + 1,
        name:req.body.name
    }
    books.push(book)
    res.status(201).send(book)
})
// http protocolning get metodi

app.get("/api/books/:id", (req, res) => {
    const book = books.find(b => b.id ===  parseInt(req.params.id)) 
    if(!book) {
        res.status(404).send("berilgan IDga teng bolgan kitob topilmadi")
    }
  res.send(book)
})

// http protocolning put metodi

app.put('/api/books/:id/', (req, res) => {
    const book = books.find(b => b.id ===  parseInt(req.params.id)) 
    if(!book)  res.status(404).send("berilgan IDga teng bolgan kitob topilmadi")

    const {error} = validateBook(req.body)

    if(error){
      return res.status(400).send(error.details[0].message)
    }

    // update book
      book.name = req.body.name;
    // returing book to user
      res.send(book)
})

app.delete('/api/books/:id', (req , res) => {
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
  return Joi.validate(book,bookSchema)
}

const port = process.env.PORT || 5000;

app.listen(port,() => {
  console.log(`${port}chi portni eshitishni boshladim`);
})
