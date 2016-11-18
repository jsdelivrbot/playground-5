/* */ 
"use strict";
function __export(m) {
  for (var p in m)
    if (!exports.hasOwnProperty(p))
      exports[p] = m[p];
}
__export(require('./src/pipes'));
__export(require('./src/directives'));
__export(require('./src/forms-deprecated'));
__export(require('./src/common_directives'));
__export(require('./src/location'));
var localization_1 = require('./src/localization');
exports.NgLocalization = localization_1.NgLocalization;