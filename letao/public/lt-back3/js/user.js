$(function () {
    var currentPage = 1;//当前页
    var pageSize = 5;//每页条数
    // 一进入页面，发送ajax请求，进行页面动态渲染
    render();
    function render() {
        $.ajax({
            type: "get",
            url: "/user/queryUser",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                var htmlStr = template("tmp", info);
                $('tbody').html(htmlStr);
                // 进行分页初始化
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: 1,//当前页
                    totalPages: Math.ceil(info.total/info.size),//总页数
                    // size: "small",//设置控件的大小，mini, small, normal,large
                    onPageClicked: function (a, b, c, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage=page;
                        // 调用render重新渲染
                        render();
                    }
                });
            }
        })
    }

    // 给启用禁用按钮添加点击事件（通过事件委托）
    // 事件委托：$('父元素').on("事件名称"，“父元素”，function(){})
    // 优点：1.可以给动态生成的元素绑定事件
    // 2.可以进行批量注册事件，性能效率更高
})