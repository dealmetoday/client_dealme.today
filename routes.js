// Routes
const Utils = require("./utils");

module.exports = function(app) {
/******************************************************************************/
    app.get("/test", function(request, response) {
        response.send("testing 1234");
    });
};
