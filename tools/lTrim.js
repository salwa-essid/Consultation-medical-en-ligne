function lTrim(str, chr) {
  var rgxtrim = (!chr) ? new RegExp('^\\s+') : new RegExp('^'+chr+'+');
  return String(str).replace(rgxtrim, '');
}

module.exports = lTrim;
