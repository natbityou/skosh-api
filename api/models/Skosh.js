/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'skoshes',
  attributes: {
    user_id: {
      type: 'number',
      required: true,
    },
    skosh_type: {
      type: 'number',
      required: true,
    },
    caption: {
      type: 'string',
      required: true,
    },
    likes: {
      type: 'number',
      defaultsTo: 0,
    },
    image:  {
      type: 'ref',
      columnType: 'bytea',
      required: true,
    },
  },
  customToJSON: function() {
    this['image'] = this['image'].toString('base64');
    
    return this;
  },
};


