$(function(){
    // 1.一进入页面，请求左侧一级分类数据，进行渲染
    $.ajax({
        type:"get",
        url:"/category/queryTopCategory",
        dataType:"json",
        success:function(info){
            // console.log(info);
            var htmlStr=template("left_tpl",info);
            $('.lt_category_left ul').html(htmlStr);
            // 根据返回回来的第一个一级分类的ID进行渲染
            renderById(info.rows[0].id);
        }
    });
    // 2.给左侧添加点击事件，通过事件委托=实现
    $('.lt_category_left').on("click","a",function(){
        // 高亮效果
        $(this).addClass("current").parent().siblings().find("a").removeClass("current");
        // 获取一级分类ID
        var id=$(this).data("id");
        // 根据ID渲染二级分类
        renderById(id);
    })


    // 根据一级分类的ID渲染二级分类
    function renderById(id){
        $.ajax({
            type:"get",
            url:"/category/querySecondCategory",
            data:{
                id:id
            },
            dataType:"json",
            success:function(info){
                console.log(info);
                var htmlStr=template("right_tpl",info);
                $('.lt_category_right ul').html(htmlStr);
            }
        })
    }
})