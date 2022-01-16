const keystone = require('keystone');
const Inquiry = keystone.list('Inquiry');

module.exports = function (req, res) {
  const view = new keystone.View(req, res);
  const locals = res.locals;

  // Set locals
  locals.section = 'contact';
  locals.formData = req.body || {};
  locals.validationErrors = {};
  locals.inquirySubmitted = false;

  // On POST requests, add the Inquiry item to the database
  view.on('post', { action: 'contact' }, function (next) {
    const newInquiry = new Inquiry.model();
    const updater = newInquiry.getUpdateHandler(req);

    updater.process(req.body, {
      flashErrors: true,
      fields: 'name, email, phone, message',
      errorMessage: 'There was a problem submitting your inquiry:',
    }, function (err) {
      if (err) {
        locals.validationErrors = err.errors;
      } else {
        locals.inquirySubmitted = true;
      }
      next();
    });
  });

  view.render('contact');
};
