module.exports = function(app, dbConn) {
  app.get('/auth', function(req, res) {
    console.log('got the get!');
    res.end();
  });
};
