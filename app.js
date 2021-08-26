const express = require('express')
const app = express()
const path = require(`path`)
const router = require(`./routes/home`)
const session = require('express-session')


app.use(express.urlencoded({extended:true}))
const port = 3000

app.use(express.static(path.join(__dirname , `public`)))
app.set(`view engine` , `ejs`)

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(`/` , router)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})