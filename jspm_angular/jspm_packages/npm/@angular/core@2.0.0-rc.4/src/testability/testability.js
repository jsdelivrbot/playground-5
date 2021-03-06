/* */ 
"use strict";
var decorators_1 = require('../di/decorators');
var async_1 = require('../facade/async');
var collection_1 = require('../facade/collection');
var exceptions_1 = require('../facade/exceptions');
var lang_1 = require('../facade/lang');
var ng_zone_1 = require('../zone/ng_zone');
var Testability = (function() {
  function Testability(_ngZone) {
    this._ngZone = _ngZone;
    this._pendingCount = 0;
    this._isZoneStable = true;
    this._didWork = false;
    this._callbacks = [];
    this._watchAngularEvents();
  }
  Testability.prototype._watchAngularEvents = function() {
    var _this = this;
    async_1.ObservableWrapper.subscribe(this._ngZone.onUnstable, function(_) {
      _this._didWork = true;
      _this._isZoneStable = false;
    });
    this._ngZone.runOutsideAngular(function() {
      async_1.ObservableWrapper.subscribe(_this._ngZone.onStable, function(_) {
        ng_zone_1.NgZone.assertNotInAngularZone();
        lang_1.scheduleMicroTask(function() {
          _this._isZoneStable = true;
          _this._runCallbacksIfReady();
        });
      });
    });
  };
  Testability.prototype.increasePendingRequestCount = function() {
    this._pendingCount += 1;
    this._didWork = true;
    return this._pendingCount;
  };
  Testability.prototype.decreasePendingRequestCount = function() {
    this._pendingCount -= 1;
    if (this._pendingCount < 0) {
      throw new exceptions_1.BaseException('pending async requests below zero');
    }
    this._runCallbacksIfReady();
    return this._pendingCount;
  };
  Testability.prototype.isStable = function() {
    return this._isZoneStable && this._pendingCount == 0 && !this._ngZone.hasPendingMacrotasks;
  };
  Testability.prototype._runCallbacksIfReady = function() {
    var _this = this;
    if (this.isStable()) {
      lang_1.scheduleMicroTask(function() {
        while (_this._callbacks.length !== 0) {
          (_this._callbacks.pop())(_this._didWork);
        }
        _this._didWork = false;
      });
    } else {
      this._didWork = true;
    }
  };
  Testability.prototype.whenStable = function(callback) {
    this._callbacks.push(callback);
    this._runCallbacksIfReady();
  };
  Testability.prototype.getPendingRequestCount = function() {
    return this._pendingCount;
  };
  Testability.prototype.findBindings = function(using, provider, exactMatch) {
    return [];
  };
  Testability.prototype.findProviders = function(using, provider, exactMatch) {
    return [];
  };
  Testability.decorators = [{type: decorators_1.Injectable}];
  Testability.ctorParameters = [{type: ng_zone_1.NgZone}];
  return Testability;
}());
exports.Testability = Testability;
var TestabilityRegistry = (function() {
  function TestabilityRegistry() {
    this._applications = new collection_1.Map();
    _testabilityGetter.addToWindow(this);
  }
  TestabilityRegistry.prototype.registerApplication = function(token, testability) {
    this._applications.set(token, testability);
  };
  TestabilityRegistry.prototype.getTestability = function(elem) {
    return this._applications.get(elem);
  };
  TestabilityRegistry.prototype.getAllTestabilities = function() {
    return collection_1.MapWrapper.values(this._applications);
  };
  TestabilityRegistry.prototype.getAllRootElements = function() {
    return collection_1.MapWrapper.keys(this._applications);
  };
  TestabilityRegistry.prototype.findTestabilityInTree = function(elem, findInAncestors) {
    if (findInAncestors === void 0) {
      findInAncestors = true;
    }
    return _testabilityGetter.findTestabilityInTree(this, elem, findInAncestors);
  };
  TestabilityRegistry.decorators = [{type: decorators_1.Injectable}];
  TestabilityRegistry.ctorParameters = [];
  return TestabilityRegistry;
}());
exports.TestabilityRegistry = TestabilityRegistry;
var _NoopGetTestability = (function() {
  function _NoopGetTestability() {}
  _NoopGetTestability.prototype.addToWindow = function(registry) {};
  _NoopGetTestability.prototype.findTestabilityInTree = function(registry, elem, findInAncestors) {
    return null;
  };
  return _NoopGetTestability;
}());
function setTestabilityGetter(getter) {
  _testabilityGetter = getter;
}
exports.setTestabilityGetter = setTestabilityGetter;
var _testabilityGetter = new _NoopGetTestability();
