const express = require('express')
const app = express()
const path = require(`path`)
const router = require(`./routes/home`)


app.use(express.urlencoded({extended:true}))
const PORT = process.env.PORT|| 3000

app.use(express.static(path.join(__dirname , `public`)))
app.set(`view engine` , `ejs`)
app.use(`/` , router)

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})