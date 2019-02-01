const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const passport = require("passport")

const config = require('./config/db').database
const users = require('./routes/users')

const app = express()
const port = 4000


//mongo connection
mongoose
  .connect(
    config,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(cors())

//set static folder for frontend
app.use(express.static(path.join(__dirname, 'client')))

app.get('/',(req,res)=>{
    res.send('here huh')
})

//body-parser middleware
app.use(bodyParser.json())

//passport middleware
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)


app.use('/users', users)

app.listen(port, ()=>{
    console.log("app started on port " +port)
})