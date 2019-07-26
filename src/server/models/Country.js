'use strict';

const { Model } = require('objection');

class Country extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'countries';
  }
}

module.exports = Country;
