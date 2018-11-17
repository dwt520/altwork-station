// 需求，进行表单校验
$(function(){
    // 进行表单校验配置
    // 校验要求
    // （1）用户名不能为空，长度为2-6位
    // （2）密码不能为空，长度为6-12位
    // 获取元素
    $('#form').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        // excluded: [':disabled', ':hidden', ':not(:visible)'],
      
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',
          invalid: 'glyphicon glyphicon-remove',
          validating: 'glyphicon glyphicon-refresh'
        },
      
        //3. 指定校验字段
        fields: {
          //校验用户名，对应name表单的name属性
          username: {
            validators: {
              //不能为空
              notEmpty: {
                message: '用户名不能为空'
              },
              //长度校验
              stringLength: {
                min: 2,
                max: 6,
                message: '用户名长度必须在2到6之间'
              },
            //   配置回调函数的提示信息
            callback:{
                message:"用户名不存在"
            }
              //正则校验
            //   regexp: {
            //     regexp: /^[a-zA-Z0-9_\.]+$/,
            //     message: '用户名由数字字母下划线和.组成'
            //   }
            }
          },
          password: {
            validators: {
              //不能为空
              notEmpty: {
                message:'密码不能为空'
              },
              //长度校验
              stringLength: {
                min: 6,
                max: 12,
                message: '用户名长度必须在6到12之间'
              },
              //   配置回调函数的提示信息
            callback:{
                message:"密码错误"
            }
              //正则校验
            //   regexp: {
            //     regexp: /^[a-zA-Z0-9_\.]+$/,
            //     message: '用户名由数字字母下划线和.组成'
            //   }
            }
          },
        }

      });

    //   2.表单校验需要在表单提交时，进行表单校验，需要submit按钮，可以注册一个表单校验
    //   成功事件，表单校验成功之后，默认会提交
    // 可以再成功事件中，阻止默认的表单提交，通过ajax提交，就不会跳转了
//       ## 注册表单验证成功事件

// 当表单校验成功时，会触发`success.form.bv`事件，此时会提交表单，
// 这时候，通常我们需要禁止表单的自动提交，使用ajax进行表单的提交。

// ```javascript
$("#form").on('success.form.bv', function (e) {
    // 阻止表单的默认提交
    e.preventDefault();
    console.log("校验通过，通过ajax提交");
    
    //使用ajax提交逻辑
    $.ajax({
        type:"post",
        url:"/employee/employeeLogin",
        data:$('#form').serialize(),//表单序列化
        dataType:"json",
        success:function(info){
            console.log(info);
            if(info.success){
                location.href="index.html";
            }
            if(info.error===1000){
                // alert("用户名不存在");
                // 调用插件提供的方法，将用户input状态，更新成校验失败状态
                $('#form').data('bootstrapValidator').updateStatus("username","INVALID" , "callback");
            }
            if(info.error===1001){
                // alert("密码不存在");
                $('#form').data('bootstrapValidator').updateStatus("password","INVALID" , "callback");
            }
        }
    })

});
// ```

// 3.重置按钮
$('[type="reset"]').click(function(){
    $(form).data('bootstrapValidator').resetForm();//没传参，只重置内容

})

})