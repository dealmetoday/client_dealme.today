const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const router = express.Router()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// connect to DBs
// var tagsDB = require('./connections/tags')
// var authDB = require('./connections/auth')
// var userDB = require('./connections/users')
var mallDB = require('./connections/malls')
// var checkInDB = require('./connections/checkin')
// var dealsDB = require('./connections/deals')

// connect routes for CRUD for the different databases
require('./routes/tagRoutes')(app);
require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/mallRoutes')(app);
// require('./routes/checkinRoutes')(app);
require('./routes/dealRoutes')(app);

var newID = mongoose.Types.ObjectId();
var today = Date.now();

app.use('/', (req, res) => {
  res.json({
    id: newID,
    time: today
  })
})

app.use('/details', (req, res) => {
  res.json({
    app_name: 'MERN App',
    developer: 'Fayvor George',
    aka: 'synthesis',
    info: 'This app is a demo on building mern stack applications with custom webpack and react setup. Have fun... Head over to the github page for more information'
  })
})

app.listen(PORT, () => console.log(`App is running on port ${PORT}`))
