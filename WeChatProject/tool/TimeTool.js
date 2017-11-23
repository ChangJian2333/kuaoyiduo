function formatTime(date, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  returnArr.push(date.getFullYear());
  returnArr.push(this.formatNumber(date.getMonth() + 1));
  returnArr.push(this.formatNumber(date.getDate()));

  returnArr.push(this.formatNumber(date.getHours()));
  returnArr.push(this.formatNumber(date.getMinutes()));
  returnArr.push(this.formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatNumber: formatNumber,
  formatTime: formatTime
}