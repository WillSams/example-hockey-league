const keystone = require('keystone');
const Types = keystone.Field.Types;

const Inquiry = new keystone.List('Inquiry', { nocreate: true, noedit: true, });

Inquiry.add({
  name: { type: Types.Name, required: true },
  email: { type: Types.Email, required: true },
  phone: { type: String },
  message: { type: Types.Markdown, required: true },
  createdAt: { type: Date, default: Date.now },
});

Inquiry.schema.pre('save', function (next) {
  this.wasNew = this.isNew;
  next();
});

Inquiry.schema.post('save', function () {
  if (this.wasNew) {
    this.sendNotificationEmail();
  }
});

Inquiry.schema.methods.sendNotificationEmail = function (callback) {
  if (typeof callback !== 'function') {
    callback = function (err) {
      if (err) { console.error('There was an error sending the notification email:', err); }
    };
  }

  if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
    console.log('Unable to send email - no mailgun credentials provided');
    return callback(new Error('could not find mailgun credentials'));
  }

  const inquiry = this;
  const brand = keystone.get('brand');

  keystone.list('User').model.find().where('isAdmin', true).exec(function (err, admins) {
    if (err) return callback(err);
    new keystone.Email({
      templateName: 'inquiry-notification',
      transport: 'mailgun',
    }).send({
      to: admins,
      from: {
        name: 'South East Junior College Hockey League',
        email: 'contact@samswebs.com',
      },
      subject: 'New Inquiry for Sams Webs',
      inquiry: inquiry,
      brand: brand,
    }, callback);
  });
};

Inquiry.defaultSort = '-createdAt';
Inquiry.defaultColumns = 'name, email, createdAt';
Inquiry.register();
