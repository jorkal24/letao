$(function () {
    // 用户名密码不能为空
    // 密码长度在6-12位

    var $form = $("form");

    $form.bootstrapValidator({
        // 校验时的图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 配置校验的规则
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: "用户名不能为空"
                    },
                    callback: {
                        message: "用户名不存在"
                    }
                }
            },
            password: {
                notEmpty: {
                    message: "用户名不能为空"
                },
                stringLength: {
                    min: 6,
                    max: 12,
                    message: "密码长度在6-12位"
                },
                callback: {
                    message: "密码不不正确"
                }
            }
        }
    });

    // 发送ajax请求(给提交按钮设置点击事件)
    $($form).on("success.form.bv" , function(e){
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            data: $form.serialize(),
            success: function(data){
                if(data.success) {
                    location.href = "./index.html";
                }
                if(data.error == 1000){
                    $form.data("bootstrapValidator").updateStatus("username","INVALID","callback");
                }
                if(data.error == 1001) {
                    $form.data("bootstrapValidator").updateStatus("password","INVLAID","callback");
                }
            }
        });    
    });

    //重置功能,重置样式
    $("[type ='reset']").on("click" , function (){
        $form.data("bootstrapValidator").resetForm();
    })
    
});