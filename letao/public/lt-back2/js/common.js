// 进度条
// NProgress.start();

// setTimeout(function(){
//   NProgress.done();
// },500)
// 需求：在第一个ajax请求时，开启进度条
// 在所有ajax请求都回来后，关闭进度条
$( document ).ajaxStart(function() {
  // $( ".log" ).text( "Triggered ajaxStart handler." );
  // 第一个ajax发送时调用，关闭进度条
  NProgress.start();
});
$( document ).ajaxStop(function() {
  // $( ".log" ).text( "Triggered ajaxStop handler." );
  // 关闭进度条
  // NProgress.done();工作的时候不要加定时器
  setTimeout(function(){
  NProgress.done();
},500)
});