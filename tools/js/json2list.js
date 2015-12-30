
/*
  json2list ���Ժܷ���İ�json����ת��Ϊhtml�б� 
  �ɽ��ܵĲ�������Ϊtypeof: 'object'
  ������[...], {...}, null
  [...] ��ʾ������ʽ�Ķ��� typeOf: 'array'
  {...} ��ʾɢ����ʽ�Ķ��� typeOf: 'object'
  null ��ʾʲô��û�еĶ��� typeOf: 'null'
  �����null, [], {} ������������: 'null'
  by rugby, wlxku123@gmail.com 2011.5.14
*/
 
var json2list = function _parse(o) {
  if (isFalse(o))  // ���ʵ����ֻ��� [...], {...}, null
    return 'null'; // �����[],{}��null����һ�����ͷ���'null'�ַ�
  else {
    var i, s = '', t = typeOf(o);
    for (i in o) {
      var s1 = '', t1 = typeof o[i];
      if (t1 === 'object')
        s1 = _parse(o[i]);
      else // ����[...]��{...}����ģ�ֱ���ַ�������
        s1 = '<span>' + String(o[i]) + '</span>';
 
      if (t === 'array')
        s += '<li>' + s1 + '</li>';
      else //'object'��Ҫ���ϼ�ֵ
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
    t = 'null'; //null��ʾʲô��û��,ֻ��null===null�ŷ���true
  if (t === 'object' && value.constructor === Array)
    t = 'array'; //���typeȷʵΪ'object'������Ż�ִ��
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
    for(i in value) return false; //��������ǿ�ö�ٵ�
  else if (t === 'function')
    return isFalse(value()); //���ݺ����ķ���ֵ�ж�
  else
    s = value ? false : true;
  return s;
}
 
//PS: �����typeOfֻ��ͬһcontext����Ч��
// �ڲ�ͬ֡�򴰿��£���ο�Douglas Crockford��
// Remedial JavaScript һ�ģ�����⡣
// isFalseҲ���Ǻ��ϸ񣬵�Ȼ�����ﹻ���ˡ�
 
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

// ʵ�������ֱ����ϵĽṹ����û��̫������壬����˵�������ս��
// ����������ӣ�
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
// ����������и�����jc.upload����Ϊ����һ��ͼƬ(�û��뿴����Ҳ��ͼƬ)��
// ���ԣ���������赱�ĵ�������Ȼ��ֱ�ӵķ������ǲ���HTML�����ַ�����
//
// ͨ�����Ƶķ�������ʵ��JSONԴ���ݺ�HTML�ĵ����໥ӳ�䣬Ҳ����˵��
// JSON��������������ݿ�ܣ���Ȼ���ǵײ�ģ�����HTML�ĵ�
// ��һ����ģ��֮��ͨ��JavaScript�ĸ�������������ʾҪ��
