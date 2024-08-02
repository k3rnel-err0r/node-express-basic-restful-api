const express = require('express');

const friendsController = require('../controllers/friends.controller');

const friendsRouter = express.Router();

// Middleware specific for friends
friendsRouter.use((req, res, next) => {
    console.log('IP address: ', req.ip);
    next();
});

friendsRouter.get('/', friendsController.getFriends);
friendsRouter.get('/:friendId', friendsController.getFriend);
friendsRouter.post('/', friendsController.postFriend);

module.exports = friendsRouter;