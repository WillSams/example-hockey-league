const memjs = require('memjs');
const _ = require('lodash');

const memjsClient = memjs.Client.create(process.env.MEMCACHED_SERVER,);

exports.initLocals = (req, res, next) => {
  res.locals.user = req.user;
  next();
};

exports.flashMessages = (req, res, next) => {
  const messages = {
    info: req.flash('info'),
    success: req.flash('success'),
    warning: req.flash('warning'),
    error: req.flash('error'),
  };
  res.locals.messages = _.some(messages, items => { return items.length; }) ? messages : false;
  next();
};

exports.requireUser = (req, res, next) => {
  if (!req.user) {
    req.flash('error', 'Please sign in to access this page.');
    res.redirect('/keystone/signin');
  } else { next(); }
};

exports.cache = (req, res, next) => {
  cache_tag = `sejchl/${req.url}`;

  memjsClient.get(cache_tag, (err, content) => {
    if (err) console.warn('SEJCHL - Cache Client Not Connected');

    if (!content) {
      res.sendResponse = res.send;
      res.send = body => {
        if (!req.user) memjsClient.set(cache_tag, body, { expires: 43200 }); //12 hours

        res.sendResponse(body);
      };
      next();
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
      return;
    }
  });
};
