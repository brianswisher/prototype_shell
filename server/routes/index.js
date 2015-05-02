(function() {

  'use strict';
  var express = require('express');
  var router = express.Router();
  var db = require('diskdb');
  var mobile = require('is-mobile');
  var ENV = process.env.ENV;

  var url = require('url');
  require('node-jsx').install({extension:'.jsx'});
  var React = require('react');
  var ReactAsync = require('react-async');
  var Res = React.createFactory(
    require('../../bundle/assets/javascripts/Res.jsx')
  );

  db = db.connect('server/db', ['items']);

  router.get('/hello', function(req, res) {
    res.send('world');
  });

  router.get('/mobile', function(req, res) {
    res.send( mobile(req) );
  });

  router.get('/api/items', function(req, res) {
    res.json(db.items.find());
  });

  router.post('/api/items', function(req, res) {
    res.json(db.items.save(req.body));
  });

  router.put('/api/items', function(req, res) {
    res.json(db.items.update({
      _id: req.body._id
    }, {
      name: req.body.name,
      qty: req.body.qty
    }));
  });

  router.delete('/api/items/:_id', function(req, res) {
    res.json(db.items.remove({
      _id: req.params._id
    }));
  });

  // catch all at bottom
  // router.get('*', function(req, res) {
  //   res.render('index', {
  //     is_mobile: mobile(req),
  //     ENV: ENV,
  //     path: req.params[0]
  //   });
  // });

  router.get('*', function(req, res) {
    var path = url.parse(req.url).pathname;
    var getHost = function() {
      var host = req.headers.host.toString();

      if (ENV === 'development') {
        return host.substring(0, host.length - 1) + 1;
      } else {
        return host;
      }
    }

    ReactAsync.renderToStringAsync(
      Res({
        path: path,
        is_mobile: mobile(req),
        ENV: ENV,
        host: getHost()
      }),
      function(err, markup) {
        res.send('<!DOCTYPE html>'+markup);
      });
  });

  module.exports = router;

}());
