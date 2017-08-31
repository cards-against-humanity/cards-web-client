let router = require('express').Router();
let db = require('../../database');

let games = require('../../games');

let isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
};

module.exports = (socketHandler) => {
  router.route('/')
    .get((req, res) => {
      // Return all current games
      res.json(games.getAll());
    })
    .post(isLoggedIn, (req, res) => {
      // Create new game
      games.createGame({creator: req.user, gameName: req.body.gameName, cardpackIds: req.body.cardpackIds, timeout: req.body.timeout, maxPlayers: req.body.maxPlayers})
        .then((game) => {
          res.json(game);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    });
  
  router.post('/join', isLoggedIn, (req, res) => {
    // Join game
    try {
      let data = games.joinGame(req.user, req.body.gameName);
      res.json(data);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  router.post('/leave', isLoggedIn, (req, res) => {
    // Leave game that user is currently in
    try {
      let data = games.leaveGame(req.user);
      res.json(data);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  router.get('/current', isLoggedIn, (req, res) => {
    // Get game state for game that user is currently in
    try {
      let state = games.getStateFor(req.user);
      res.json(state);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  return router;
};