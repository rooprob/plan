var User = require('../models/user.js');

module.exports = {
  findAll: function(req, res, next) {

    return res.render('users', {
      title: 'mytitle...',
      bob: 'foo',
      users: [
        { username: 'maiaw-h43l', plan: 'maiaw-h43l/.plan' },
        { username: 'robertf-xk25', plan: 'robertf-xk25/.plan' },
      ]});
  },
};
