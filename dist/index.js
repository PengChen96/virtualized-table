'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./vtable.production.min.js');
} else {
  module.exports = require('./vtable.development.js');
}
