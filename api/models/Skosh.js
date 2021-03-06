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
      type: 'ref',
      columnType: 'bigint',
      isNumber: true,
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

    var createdAtDate = new Date(this['createdAt']);
    this['createdAt'] = createdAtDate.toISOString().slice(0, 10);
    
    var updatedAtDate = new Date(this['updatedAt']);
    this['updatedAt'] = updatedAtDate.toISOString().slice(0, 10);

    return this;
  },
};


