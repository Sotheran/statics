
/*
  json2list 可以很方便的把json数据转换为html列表 
  可接受的参数类型为typeof: 'object'
  包括：[...], {...}, null
  [...] 表示数组形式的对象 typeOf: 'array'
  {...} 表示散列形式的对象 typeOf: 'object'
  null 表示什么都没有的对象 typeOf: 'null'
  在这里，null, [], {} 的输出结果都是: 'null'
  by rugby, wlxku123@gmail.com 2011.5.14
*/
 
var json2list = function _parse(o) {
  if (isFalse(o))  // 这个实际上只检查 [...], {...}, null
    return 'null'; // 如果是[],{}和null其中一个，就返回'null'字符
  else {
    var i, s = '', t = typeOf(o);
    for (i in o) {
      var s1 = '', t1 = typeof o[i];
      if (t1 === 'object')
        s1 = _parse(o[i]);
      else // 对于[...]及{...}以外的，直接字符化即可
        s1 = '<span>' + String(o[i]) + '</span>';
 
      if (t === 'array')
        s += '<li>' + s1 + '</li>';
      else //'object'需要加上键值
        s += '<li><span>' + i + '</span> : ' + s1 + '</li>';
    }
  }
  return '<ul>' + s + '</ul>';
}
 
// Default (typeof):
// typeof Object() === 'object'
// typeof Array() === 'object'
// typeof Function() === 'function'
// typeof String() === 'string'
// typeof Number() === 'number'
// typeof Boolean() === 'boolean'
// typeof null === 'object'
// typeof undefined === 'undefined'
// Costum (typeOf):
// typeOf(Object()) === 'object'
// typeOf(Array()) === 'array'
// typeOf(Function()) === 'function'
// typeOf(String()) === 'string'
// typeOf(Number()) === 'number'
// typeOf(Boolean()) === 'boolean'
// typeOf(null) === 'null'
// typeOf(undefined) === 'undefined'
 
function typeOf(value) {
  var t = typeof value;
  if (value === null)
    t = 'null'; //null表示什么都没有,只有null===null才返回true
  if (t === 'object' && value.constructor === Array)
    t = 'array'; //如果type确实为'object'，后面才会执行
  return t;
}
 
// when checked by isFalse(), 
// the following values return true.
// Object: {}
// Array: []
// Function: depends on its returned value
// String: '' or ""
// Number: 0, NaN
// Boolean: false
// null: null
// undefined: undefined
// and others return false.
 
function isFalse(value) {
  var i, s = true, t = typeof value;
  if (value !== null && t === 'object')
    for(i in value) return false; //如果对象是可枚举的
  else if (t === 'function')
    return isFalse(value()); //依据函数的返回值判定
  else
    s = value ? false : true;
  return s;
}
 
//PS: 上面的typeOf只在同一context才有效。
// 在不同帧或窗口下，请参看Douglas Crockford的
// Remedial JavaScript 一文，有详解。
// isFalse也不是很严格，当然在这里够用了。
 
// testing ...
/*
var json = [{
  'name': 'rugby',
  'age': null,
  'languages': ['chinese', 'english', 'french']
}, {
  'name': 'pascal',
  'age': undefined,
  'languages': [],
  'more-info': {
    'id': NaN,
    'isAuth': true,
    'isAdmin': false,
    'hobbies': [{}, 'hocker', 'swimming']
  }
}];
 
document.getElementById('output').innerHTML =  json2list(json);
*/

// 实际上这种表面上的结构化并没有太大的意义，或者说不是最终结果
// 看下面的例子：
//
// var jc = {
//   "gender": "Male", 
//   "hobbies": ["walking", "swimming"], 
//   "upload": "logo.png.4dea26c64f6d001039000000", 
//   "name": "wlx"
// };
// 
// var src = '?_i=' + jc.upload.split('.')[2];
// jc.upload = '<img height="100" width="100" src="' + src + '" />';
// document.getElementById('output').innerHTML =  json2list(jc);
// 
// 在这个例子中更新了jc.upload，因为这是一个图片(用户想看到的也是图片)，
// 所以，必须进行设当的调整，当然最直接的方法就是插入HTML代码字符串。
//
// 通过类似的方法可以实现JSON源数据和HTML文档的相互映射，也就是说，
// JSON来管理基本的数据框架（显然不是底层的），而HTML文档
// 在一定的模板之上通过JavaScript的辅助解析满足显示要求。
