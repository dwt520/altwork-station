$(function () {
    var currentPage = 1;//当前页
    var pageSize = 3;//每页条数
    var picArr = [];
    // 1.一进入页面，发送请求，渲染页面
    render();
    function render() {
        $.ajax({
            type: "get",
            url: "/product/queryProductDetailList",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                var htmlStr = template("productTpl", info);
                $("tbody").html(htmlStr);
                // 进行分页初始化
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    totalPages: Math.ceil(info.total / info.size),
                    currentPage: info.page,
                    onPageClicked: function (a, b, c, page) {
                        // 更新当前页
                        currentPage = page;
                        // 重新渲染
                        render();
                    }
                })
            }
        })
    }

    // 2.点击添加按钮，显示添加模态框
    $('#addBtn').click(function () {
        $('#addModal').modal("show");
        // 发送ajax请求，请求所有的二级分类数据，进行渲染
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                var htmlStr = template("dropdownTpl", info);
                $('.dropdown-menu').html(htmlStr);
            }

        })
    });

    // 3.通过事件委托，给所有dropdown里面的a添加点击事件
    $('.dropdown-menu').on("click", "a", function () {
        // 获取文本，设置给按钮
        var txt = $(this).text();
        $('#dropdownText').text(txt);
        // 获取ID，设置给隐藏域
        var id = $(this).data("id");
        $('[name="brandId"]').val(id);
        // 将校验状态, 改成 VALID
        $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID");
    })


    // 4.进行文件上传配置
    $("#fileupload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            console.log(data);
            var picObj = data.result;//后台返回的结果（图片名称、图片地址）
            var picUrl = picObj.picAddr;//图片地址
            //   往数组的最前面追加
            picArr.unshift(picObj);
            // 结构上，往最前面追加
            $('#imgBox').prepend('<img src="' + picUrl + '" style="height:100px" alt="">');
            if (picArr.length > 3) {
                // 将最前面的保留，将最后移除
                // 移除数组最后一组
                picArr.pop();
                // 移除图片结构中最后一个图片，招最后一个图片类型的元素，进行删除，让他自杀
                $('#imgBox img:last-of-type').remove();
            }
            if (picArr.length === 3) {
                // 说明文件上传3张了，picStatus状态一年更新成VALID
                $("#form").data("bootstrapValidator").updateStatus("picStatus", "VALID");
            }
        }
    });

    //   5.进行表单校验初始化
    $('#form').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        // excluded: [':disabled', ':hidden', ':not(:visible)'],
        excluded: [],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            brandId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请选择二级分类'
                    },
                }
            },
            brandId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请选择二级分类'
                    },
                }
            },
            proName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品名称'
                    },
                }
            },
            proDesc: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品描述'
                    },
                }
            },
            num: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品库存数量'
                    },
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '请输入非零开头的数字'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: "请输入尺码"
                    },
                    // 校验需求: 必须是 xx-xx 的格式,  xx两位数字
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '必须是 xx-xx 的格式,  xx两位数字'
                    }
                }
            },

            oldPrice: {
                validators: {
                    notEmpty: {
                        message: "请输入商品原价"
                    }
                }
            },

            price: {
                validators: {
                    notEmpty: {
                        message: "请输入商品现价"
                    }
                }
            },

            // 专门用于标记文件上传是否满 3张 的
            picStatus: {
                validators: {
                    notEmpty: {
                        message: "请上传3张图片"
                    }
                }
            }

        }

    });

    // 6.注册表单校验成功事件，阻止默认的提交，通过ajax提交
    $('#form').on("success.form.bv",function(e){
        e.preventDefault();
        var params=$('#form').serialize();//获取所有input的数据
        console.log(picArr);
        // 还要加上图片的数据
        // params+="$picName1=xx&picAddr1=xx"
        params+="&picName1="+picArr[0].picName+"&picAddr1="+picArr[0].picAddr;
        params+="&picName2="+picArr[1].picName+"&picAddr2="+picArr[1].picAddr;
        params+="&picName3="+picArr[2].picName+"&picAddr3="+picArr[2].picAddr;
        $.ajax({
            type:"post",
            url:"/product/addProductPic",
            data:params,
            dataType:"json",
            success:function(info){
                console.log(info);
                if(info.success){
                    // 关闭模态框
                    $('#addModal').modal("hide");
                    // 重新渲染第一页
                    currentPage=1;
                    render();
                    // 重置内容和状态
                    $('#form').data("bootstrapValidator").resetForm(true);
                    // 重置下拉按钮和图片内容
                    $('#dropdownText').text("请选择二级分类");
                    $('#imgBox img').remove();
                    // 清空数组
                    picArr=[];
                }
                
            }
        })
    })


})