/* */ 
"use strict";
var core_1 = require('@angular/core');
var lang_1 = require('../facade/lang');
var invalid_pipe_argument_exception_1 = require('./invalid_pipe_argument_exception');
var I18nSelectPipe = (function() {
  function I18nSelectPipe() {}
  I18nSelectPipe.prototype.transform = function(value, mapping) {
    if (lang_1.isBlank(value))
      return '';
    if (!lang_1.isStringMap(mapping)) {
      throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(I18nSelectPipe, mapping);
    }
    return mapping.hasOwnProperty(value) ? mapping[value] : '';
  };
  I18nSelectPipe.decorators = [{
    type: core_1.Pipe,
    args: [{
      name: 'i18nSelect',
      pure: true
    }]
  }];
  return I18nSelectPipe;
}());
exports.I18nSelectPipe = I18nSelectPipe;
