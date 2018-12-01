$(function(){
    // 根据封装的方法，获取地址栏搜索关键字
    var key=getSearch("key");
    // console.log(key);
    // 1.将搜索关键字赋值给input
    $('.search_input').val(key);
    // 2.一进入页面，需要根据搜索关键字，请求对应的搜索数据，进行渲染
    render();
    // 点击搜索按钮，实现搜索功能
    $('.search_btn').click(function(){
        render();
    });
    // 4.给排序按钮，添加点击效果
    // （1）如果自己没有current类，加上current类
    // （2）如果自己有current类，改变箭头方向
    // 应该排序完成，重新渲染页面
    $('.lt_sort a[data-type]').click(function(){
        if($(this).hasClass("current")){
            $(this).find("i").toggleClass("fa-angle-up").toggleClass("fa-angle-down");
        }else{
            $(this).addClass("current").siblings().removeClass("current");
        }
        render();
    })





    function render(){
        // 每次请求渲染时，先显示loading中的效果
        $('.lt_product').html('<div class="loading"></div>')
        var params={};//所有用于请求的参数
        // 这是三个必选参数
        params.proName=$('.search_input').val();//动态获取搜索框的val值
        params.page=1;
        params.pageSize=100;

        // 还有两个额外的可选参数
        // （1）通过判断有没有current的a,来决定需不需要传参
        // （2）通过判断箭头方向，决定升序还是降序排序，1升序，2降序
        var $current=$('.lt_sort a.current');
        if($current.length===1){
            var sortName=$current.data("type");
            var sortValue=$current.find("i").hasClass("fa-angle-down")?2:1;
            params[sortName]=sortvalue;
        }

        $.ajax({
            type:"get",
            url:"/product/queryProduct",
            data:params,
            dataType:"json",
            success:function(info){
                console.log(info);
                var htmlStr=template("productTpl",info);
                $('.lt_product').html(htmlStr);
            }
        })
    }
})