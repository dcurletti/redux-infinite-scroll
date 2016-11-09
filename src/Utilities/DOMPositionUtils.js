export function topPosition(domElt) {
  if (!domElt) {
    return 0;
  }
  return domElt.offsetTop + topPosition(domElt.offsetParent);
}

export function leftPosition(domElt) {
  if (!domElt) {
    return 0;
  }
  return domElt.offsetLeft + leftPosition(domElt.offsetParent);
}
