$(function (){

    $.ajax({
        type: "get",
        url: "/user/queryUserMessage",
        success: function (info){
            if(info.error === 400){
                location.href = "login.html";
            }
            console.log(info)
            var html = template( "tpl1" , info )
            $(".userinfo").html(html);
        }
    })


    $(".btn_logout").on("click" , function (){

        $.ajax({
            type: "get",
            url: "/user/logout",
            success: function (info){
                if(info.success){
                    location.href = "login.html"
                }
            }
        })

    })

})