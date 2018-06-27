import 'normalize.css';
import '../css/index.scss';
import Result from './app/result.js';
// const $ = require('../lib/jquery-3.3.1.min.js');
// const createjs = require('../lib/createjs.min.js');
//设计稿背景尺寸
const bgInfo = {
  width: 750 / 2,
  height: 1179 / 2
};

//屏幕宽高
let ratio = window.innerWidth / bgInfo.width;
let optionData = {
  result: []
};

function changVal(num) {
  return window.innerHeight / bgInfo.height * num / 2;
}
// document.getElementById('music').onload = function(){
//   document.getElementById('music').play();
// }
window.onload = function () {
  $('#content').css({
    'margin-top': changVal(200),
    width: changVal(528)
  });
  
  $('#content input').css({
    'margin-top': changVal(227),
    width: changVal(385),
    height: changVal(81)
  });
  var musicStatus = false;
  $('.music-btn').on('click',function(){
    if(musicStatus){
      $('#music')[0].pause();
      $(this).addClass('stop');
      musicStatus = false;
    }else{
      $('#music')[0].play();
      $(this).removeClass('stop');
      musicStatus = true;
    }
    
  });
  $('.quest-content').css({
    'margin-top': changVal(600)
  });
  //开始测试
  $('.submit').on('click', function () {
    var name = $('#content input').val();
    if (name === '') {
      alert('姓名不能为空');
      return false;
    }
    optionData.nickName = name;
    $('.main').removeClass('show');
    $('.quest-wrap').addClass('show');
    startTest && startTest()
  });
  //答题
  $('.quest').on('click','.quest-list',function(){
    let opt = $(this).attr('class').replace(/.[^_]*__(\w+?)/i,'$1');
    let parent = $(this).parents('.quest');
    let number = parent.attr('class')
                .replace(/[^\d]/g,'');
    if(number == 1 || number == 6){
      optionData.result.push(opt);
    }
    parent.removeClass('show').next().addClass('show');
  });
  //选择性别
  $('.sex-option').on('click','a',function(){
    optionData.sex = $(this).attr('title');
    
    $(this).addClass('active').siblings().removeClass('active');
  });
  //提交答题
  $('.sex-submit').on('click',function(){
    if($('.sex-option a.sex-boy').hasClass('active') || $('.sex-option a.sex-girl').hasClass('active')){
    $('.sex').removeClass('show');
    $('.quest-wrap').removeClass('show');
    $('.result-wrap').addClass('show');
    $('#nickName').text(optionData.nickName);
   
    optionData.result = optionData.result.join('');
      new Result({
        result: optionData.result,
        nickName: optionData.nickName
      }).init();
    }else{
      alert('选择性别');
      return ;
    }
  });
  //打开菜谱
  $('.open-btn').on('click',function(){
    let result = sessionStorage.getItem('result');
    $('#pop').addClass('show');
    $('#pop .img'+result).show().siblings().hide();
    getCb && getCb();
  })
  //关闭菜谱
  $('.close-btn').on('click',function(){
    $('#pop').removeClass('show');
  })
  //再测一次
  $('.restart').on('click',function(){
    $('.result-wrap').removeClass('show');
    $('.quest-wrap').addClass('show');
    $('.quest-wrap .quest__1').addClass('show');
    optionData.result = [];
  })
}
