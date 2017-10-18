var express = require('express');
var router = express.Router();
var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '417062',
  key: '9a3edab5733cf2411655',
  secret: 'a9c9f28caefbbb228855',
  cluster: 'ap2',
  encrypted: true
});



/* GET users listing. */
router.get('/', function(req, res, next) {
  var msg = req.query['msg'];
  pusher.trigger('private-messages', 'client-new-message', {
    "message": msg
  });
  res.end();
});

router.post('/auth/', function(req, res, next) {
  console.log('POST to /pusher/auth');
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  console.log(socketId, channel);
  const auth = pusher.authenticate(socketId, channel);
  
  res.send(auth);
});

module.exports = router;
