// server.js

const express        = require("express");
// const MongoClient    = require("mongodb").MongoClient;
const bodyParser     = require("body-parser");
const app            = express();

const port = 3000;
const localUrl = "mongodb://localhost:27017";
const dbName = "mainDB";

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true}));

app.use(bodyParser.json({ limit: "50mb", extended: true}));

require("./routes")(app)

app.listen(port, "0.0.0.0", () => {
    console.log("We are live on " + port);
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
