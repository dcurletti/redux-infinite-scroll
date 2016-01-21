"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.topPosition = topPosition;
function topPosition(domElt) {
  if (!domElt) {
    return 0;
  }
  return domElt.offsetTop + topPosition(domElt.offsetParent);
}