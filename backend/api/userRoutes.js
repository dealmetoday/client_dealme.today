module.exports = function(app, dbConn) {
  app.get('/users', function(req, res) {
    console.log('got the get!');
    res.end();
  });
};
