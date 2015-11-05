/**
 * ReactDOM v0.14.2
 *
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
// Based off https://github.com/ForbesLindesay/umd/blob/master/template.js
;(function(f) {
  if (typeof module !== "undefined" && typeof module.exports === "object") {
    module.exports.ReactDOM = f(module.exports.React);
  } else if (typeof AlloyEditor === "object") {
    AlloyEditor.ReactDOM = f(AlloyEditor.React);
  } else if (typeof window !== "undefined") {
    window.ReactDOM = f(window.React);
  } else if (typeof self !== "undefined") {
    self.ReactDOM = f(self.React);
  } else if (typeof global !== "undefined") {
    global.ReactDOM = f(global.React);
  } else {
    this.ReactDOM = f(this.React);
  }

})(function(React) {
  return React.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
});