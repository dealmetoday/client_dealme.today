// Routes

const Utils = require("./utils");

module.exports = function(app) {
/******************************************************************************/
    app.get("/", function(request, response) {
        console.log("nANI");
        console.log(Utils.testMsg);
        response.send(Utils.testMsg);
    });
};
