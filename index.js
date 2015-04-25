var couchUrl = 'http://localhost:5985'
var nano = require('nano')(couchUrl)

nano.db.create('test', function (error) {
  if (error && error.statusCode !== 412) return console.log(error)

  console.log('fixing admin party')
  nano.request({
    method: 'put',
    path: '_config/admins/admin',
    body: 'secret'
  }, function(error) {
    if (error) {
      return console.log(error)
    }

    // open this URL to get the same result
    // http://localhost:5985/test/_changes?since=0&feed=continuous&heartbeat=30000

    console.log('listen to changes for /test')
    var db = nano.use('test')
    var feed = db.follow({})
    feed.follow()
  });

})
