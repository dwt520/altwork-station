$(function(){
    var currentPage=1;//当前页
    var pageSize=5;//每页条数
    var currentId;//当前正在修改的用户
    var idDelete;//需要修改的状态
    render();
    function render(){
        // 2.准备数据
        $.ajax({
            type:"get",
            url:"/user/queryUser",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:"json",
            success:function(info){
                console.log(info);
                var htmlStr=template("tmp",info);
                $('tbody').html(htmlStr);
            }
        })
    }
});