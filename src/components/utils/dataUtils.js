// 保留小数
export function fixNum(num, long) {
  let numLong = 2;
  if (long === 0) {
    numLong = long;
  }
  if (long) {
    numLong = long;
  }
  num = Number(num).toFixed(numLong);
  if (num) {
    num = num + '';
    let fix = ''; // 小数点情况
    let splitArr = num.split('.');
    num = splitArr[0];
    fix = splitArr[1] ? splitArr[1] : '';
    num = num.replace(/\d{1,3}(?=(\d{3})+$)/g, function(s) {
      return s + ',';
    });
    if (fix) {
      return num + '.' + fix;
    }
    return num;
  }
  return num;
};

export function formatParams(data) {
  // 格式化参数
  var arr = [];
  for (var name in data) {
    arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
  }
  return arr.join('&');
};
