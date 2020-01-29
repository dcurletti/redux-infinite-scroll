"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.topPosition = topPosition;
exports.leftPosition = leftPosition;

function topPosition(domElt) {
  if (!domElt) {
    return 0;
  }

  return domElt.offsetTop + topPosition(domElt.offsetParent);
}

function leftPosition(domElt) {
  if (!domElt) {
    return 0;
  }

  return domElt.offsetLeft + leftPosition(domElt.offsetParent);
}