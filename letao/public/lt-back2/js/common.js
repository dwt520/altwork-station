
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
$(function(){
    // 公共的功能
    // 1.导航点击切换
      $('.lt_aside .category').click(function(){
        // 让下一个兄弟元素切换显示模式
        $(this).next().stop().slideToggle();
      });
      // 2.左侧菜单列表切换功能
      $(".lt_topbar .icon_left").click(function(){
        $('.lt_aside').toggleClass("hidemenu");
        $('.lt_main').toggleClass("hidemenu");
        $('.lt_topbar').toggleClass("hidemenu");
      });
      // 3退出功能
      $('.lt_topbar .icon_right').click(function(){
        // 点击按钮，显示模态框
        $('#logoutModal').modal("show");//hide隐藏模态框
      });
      $('#logoutBtn').click(function(){
        // 发送请求，让后台销毁当前用户的登录状态
        $.ajax({
          type:'get',
          url:'/employee/employeeLogout',
          dataType:'json',
          success:function(info){
            console.log(info);
            if(info.success){
              location.href="login.html"
            }
          }
        })
      })
})