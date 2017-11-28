$(function (){
    $(".btn_login").on("click" , function (){
        console.log(11);
        var userName = $("[name='username']").val().trim();
        var password = $("[name='password']").val().trim();

        if(!userName){
            mui.toast("请输入用户名");
            return false;
        }

        if(!password){
            mui.toast("请输入密码");
            return false;
        }

        $.ajax({
            type: "post",
            url: "/user/login",
            data: {
                userName: userName,
                password: password
            },
            success: function (info){
                if(info.error === 403){
                    mui.toast(info.message);
                }

                var search = location.search;
                
                if(search.indexOf("retUrl") != -1){
                    
                    search = search.replace("?retUrl=" , "");
                    location.href = search;
                }else {
                    location.href = "user.html";
                }
            }
        });
    })
})