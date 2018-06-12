'use strict';
const debug = require('debug')('agenda:createIndex');

/**
 * Setup and initialize the collection used to manage Jobs.
 * @param {String} collection name or undefined for default 'agendaJobs'
 * @param {Function} cb called when the db is initialized
 * @returns {undefined}
 */
module.exports = async function() {
  const self = this;
  return new Promise((resolve, reject) => {
    this._collection.createIndex(
      this._indices,
      {name: 'findAndLockNextJobIndex'},
      (err, result) => {
        if (err) {
          debug('index creation failed');
          self.emit('error', err);
          return reject(err);
        }

        debug('index creation success');
        self.emit('index:created', result);
        resolve();
      }
    );
  });
};
