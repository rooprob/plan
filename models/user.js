var shortid = require('shortid');
var bcrypt = require('bcryptjs');

// model for user

var users = [
];

module.exports = {

  create: function(fields, cb) {

    var r = this.fetchByEmail(fields.email, [], function(err, user) {
      if (err == false) { // user was found, ie err is false
        return cb(true, {}) ;
      }

      // make local copy of fields for storage
      var user = Object.assign({}, fields);

      var hashedPassword = bcrypt.hashSync(user.password, 8);
      var uname = shortid.generate();
      user['_id'] = uname;
      user['uname'] = [user.name, uname].join('-');
      user['plan'] = [user.uname, '.plan'].join('/');
      user['password'] = hashedPassword;
      // XXX in memory store
      users.push(user);

      // sanitise
      var u = Object.assign({}, user);
      delete u.password;
      return cb(false, u);
    });
  },

  auth: function(fields, cb) {
    // locate consumer.
    var r = this.fetchByEmail(fields.email, [], function(err, user) {
      if (err == true) {
        return cb(err, {}) ;
      }

      var passwordIsValid = bcrypt.compareSync(fields.password, user.password);
      if (!passwordIsValid) {
        return cb(true, {}) ;
      }

      // sanitise
      var user = Object.assign({}, user);
      delete user.password;
      return cb(false, user);
    });
  },

  fetchById: function(_id, redact=['password'], cb) {
    var r = users.filter(function(e) {
      return (e._id === _id);
    });
    if (r.length == 1) {
      var user = Object.assign({}, r[0]);
      console.log(redact);
      for (var idx = 0; idx < redact.length; idx ++) {
        delete user[redact[idx]];
      }
      return cb(false, user);
    }
    // not found
    return cb(true, {}) ;
  },

  fetchByEmail: function(email, redact=['password'], cb) {
    var r = users.filter(function(e) {
      return (e.email === email);
    });
    if (r.length == 1) {
      var user = Object.assign({}, r[0]);
      for (var idx = 0; idx < redact.length; idx ++) {
        delete user[redact[idx]];
      }
      return cb(false, user);
    }
    // not found
    return cb(true, {}) ;
  },

  fetchAll: function(redact=['password'], cb) {
    var clean_users = [];
    for (var idx = 0; idx < users.length; idx ++) {
      var user = Object.assign({}, users[0]);
      for (var idx = 0; idx < redact.length; idx ++) {
        delete user[redact[idx]];
      }
      clean_users.push(user);
    }
    return clean_users ;
  }
};
