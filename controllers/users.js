var User = require('../models/user.js');

module.exports = {
  fetchAll: function(req, res, next) {

    var users = User.fetchAll() ;

    return res.json({ users: users });
  },
};
