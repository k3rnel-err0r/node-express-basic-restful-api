const model = require('../models/friends.model');

function getFriends(req, res) {
  res.json( model );
}

function getFriend(req, res) {
  const friendId = Number( req.params.friendId );
  const friend = model[ friendId ];

  if (!friend) {
    res.status( 404 ).json( {
      error: 'Friend not found'
    });
    return;
  }

  res.status( 200 ).json( friend );
}

function postFriend(req, res)  {
  if (!req.body.name) {
    return res.status( 400 ).json({
      error: 'Missing friend name'
    });
  }

  const newFriend = {
    id: model.length,
    body: req.body.name
  };

  model.push( newFriend );

  res.status( 201 ).json( newFriend );
}

module.exports = {
  getFriends,
  getFriend,
  postFriend
};