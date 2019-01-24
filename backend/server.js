const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const mongooseMulti = require('mongoose-multi')
const schemaFile = require('./config/schemas')
const init = require('./config/init')
const path = require('path')


let dbConfig, IPADDR;

/*if(process.env.NODE_ENV === 'production'){
  dbConfig = require('./config/prod-config')
  IPADDR = '18.191.87.9';

}
else{*/
  dbConfig = require('./config/dev-config')
  IPADDR = 'localhost'
//}


const app = express();
const PORT = process.env.PORT || 5000;
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// connect to DB
const options = { useNewUrlParser: true };
mongoose.connect(`mongodb://${IPADDR}/mern_app`, options)
  .then(() => console.log('connected to DB...'))
  .catch(err => console.log('Could not connect', err));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
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



app.use('/api/dashboard', require("./routes/api/home/home"));
// app.all('/*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });
/*app.use('/', (req, res) => {
  res.json({
    id: newID,
    time: today
  })
})*/

console.log('IF PRODUCTION')
if (process.env.NODE_ENV === 'production') {
  console.log('in production')
  console.log(path.join(__dirname, 'dist'))
  app.use(express.static(path.join(__dirname, 'dist')));
  console.log(path.resolve(__dirname, './dist/index.html'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './dist/index.html'));
  });
}

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));