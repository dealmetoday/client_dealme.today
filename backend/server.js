const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const mongooseMulti = require('mongoose-multi')
const dbConfig = require('./config/config')
const schemaFile = require('./config/schemas')
const init = require('./config/init')

const app = express()
const router = express.Router()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// DB connections
var databases = mongooseMulti.start(dbConfig.db, schemaFile);
require('./routes/tagRoutes')(app, databases.tagsDB);
require('./routes/authRoutes')(app, databases.authDB);
require('./routes/userRoutes')(app, databases.usersDB);
require('./routes/mallRoutes')(app, databases.mallsDB);
require('./routes/checkinRoutes')(app, databases.checkInDB);
require('./routes/dealRoutes')(app, databases.dealsDB);

// Initialize all the databases
init(databases);

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
