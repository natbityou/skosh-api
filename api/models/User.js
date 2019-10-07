/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'users',
  attributes: {
    email: {
      type: 'string',
      isEmail: true,
      required: true,
      unique: true
    },
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },
    avatar:  {
      type: 'ref',
      columnType: 'bytea',
      required: true,
    },
  },
  customToJSON: function() {
    this['avatar'] = this['avatar'].toString('base64');
    _.omit(this, ['password']);

    return this;
  },
  beforeCreate: function (valuesToSet, proceed) {
    // Hash password
    sails.helpers.passwords.hashPassword(valuesToSet.password).exec((err, hashedPassword)=>{
      if (err) { return proceed(err); }
      valuesToSet.password = hashedPassword;
      return proceed();
    });
  }
};


