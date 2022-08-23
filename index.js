const express = require("express")
const app = express()
const helmet = require("helmet")
const morgan = require("morgan")
const config = require("config")
const books = require("./routes/book")
const home = require("./routes/home")

if(app.get('env') === 'development') {
  app.use(morgan("tiny"))
  console.log('logger working...')
}

// urlencoded type data convert json
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(helmet())
app.set('view engine','pug')
app.set('views','/views')
app.use("/api/books", books)
// app.use("/",home)

// console.log(config.get("name"))
// console.log(config.get("mailserver.host"))
// console.log(config.get("mailserver.password"))

const port = process.env.PORT || 5000;

app.listen(port,() => {
  console.log(`${port}chi portni eshitishni boshladim`);
})
