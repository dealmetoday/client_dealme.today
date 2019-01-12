module.exports = function(app) {
  app.get('/malls', function(req, res) {
    console.log('got the get!');
    res.end();
  });
};
