import '../css/index.scss';
import txt from '../tmp/hd.html'; 
import s from './a.js';

let doc = document.createElement('div')
doc.innerHTML = txt
console.log(txt)
document.body.appendChild(doc)
var promise = new Promise((resolve,reject)=>{
  resolve();
});

var sj = Object.assign({
  sd: 1
},{
  sdf:2
})
console.log(sj)