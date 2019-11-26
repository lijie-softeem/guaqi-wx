const formatNumber = n => {

n = n.toString()

return n[1] ? n : '0' + n

}

 

module.exports = {

formatTime: formatTime,
formatTimes:formatTimes,
getDates:getDates

}

function formatTimes(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return year + "-" + month + "-" + day ;

}
//todate默认参数是当前日期，可以传入对应时间 todate格式为2018-10-05
function getDates(days, todate) {
  var dateArry = [];
  for (var i = 0; i < days; i++) {
    var dateObj = dateLater(todate, i);
    dateArry.push(dateObj)
  }
  return dateArry;
}
function dateLater(dates, later) {
  let dateObj = {};
  let show_day = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
  let date = new Date(dates);
  date.setDate(date.getDate() + later);
  let day = date.getDay();
  let yearDate = date.getFullYear();
  let month = ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1);
  let dayFormate = (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
  dateObj.time =  yearDate+'-'+ month + '-' + dayFormate;
  dateObj.week = show_day[day];
  return dateObj;
}

function formatTime(number, format) {

 

var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];

var returnArr = [];

 

var date = new Date(number * 1000);

returnArr.push(date.getFullYear());

returnArr.push(formatNumber(date.getMonth() + 1));

returnArr.push(formatNumber(date.getDate()));

 

returnArr.push(formatNumber(date.getHours()));

returnArr.push(formatNumber(date.getMinutes()));

returnArr.push(formatNumber(date.getSeconds()));

 

for (var i in returnArr) {

format = format.replace(formateArr[i], returnArr[i]);

}

return format;


}