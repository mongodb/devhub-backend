exports = function(params){
  const entries = Object.keys(params)
        .map(
            key =>
                encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
        );
  const string = entries.join('&');
  return string.length === 0 ? '' : '?' + string;
};

if (typeof module === 'object') {
   module.exports = exports;
}