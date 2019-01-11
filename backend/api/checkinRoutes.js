module.exports = function(app, dbConn) {
  app.get('/checkins', function(req, res) {
    console.log('got the get!');
    res.end();
  });
};
