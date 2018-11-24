// server.js
const express        = require("express");
// const MongoClient    = require("mongodb").MongoClient;
const bodyParser     = require("body-parser");
const app            = express();

const localUrl = "mongodb://localhost:27017";
const dbName = "mainDB";

var path = require('path');
var STATIC_ROOT = path.resolve(__dirname, './public');

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true}));
app.use(bodyParser.json({ limit: "50mb", extended: true}));

app.use('/', express.static(STATIC_ROOT));
require("./routes")(app);

app.listen(process.env.PORT || 5000, () => {
    console.log("We are live");
})

// MongoClient.connect(localUrl, (err, database) => {
//     if (err)
//         return console.log(err)
//
//     db = database.db(dbName)
//     require("./routes")(app, db)
//
//     app.listen(port, "0.0.0.0", () => {
//         console.log("We are live on " + port);
//     })
// });
