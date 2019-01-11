module.exports = function(app, dbConn) {
  app.get('/malls', function(req, res) {
    console.log('got the get!');
    res.end();
  });
};
