mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005, // 阻尼系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  indicators: false, //是否显示滚动条
});


// 这个方法专门用于获取地址栏传参
function getSearch( k ) {
  // 获取地址栏参数
  var str = location.search;  // 如果有中文, 是需要解码的

  // 进行中文解码
  str = decodeURI(str);  // ?key=匡威&name=pp&age=18

  // 去掉问号
  // str.slice(start, end);  // 包括start, 不包括end
  // str.slice(start);  // 表示从 start 开始截取到最后
  str = str.slice(1);    // key=匡威&name=pp&age=18

  var arr = str.split('&');   // ["key=匡威", "name=pp", "age=18"]

  var obj = {};
  
  arr.forEach(function (v, i) {  // v => age=18
    var key = v.split('=')[0];  // age
    var value = v.split('=')[1]; // 18
    // 将属性添加到 obj 中
    obj[key] = value;
  })
  return obj[k];
}
