$(function (){
    var productId = tools.getSearch("productId");
    
    $.ajax({
        type: "get",
        url: "/product/queryProductDetail",
        data: {id: productId},
        success: function (info){
            console.log(info);
            $(".mui-scroll").html(template("tpl",info))

            mui(".mui-slider").slider({
                interval: 1000
            });

            // 渲染数据后注册的事件,不需要事件委托
            $(".lt_size span").on("click" , function(){
                $(this).siblings().removeClass("now");
                $(this).addClass("now");
            })

            mui(".mui-numbox").numbox();
        }
    });


    // 添加购物车功能
    $(".lt_go_cart .add_cart").on("click" , function (){
        var num = $("[type = number]").val();
        var size = $(".lt_size span.now").text();

        if(!size){
            mui.toast("请输入尺码");
            return false;
        }
        $.ajax({
            type: "post",
            url: "/cart/addCart",
            data: {
                productId: productId,
                size: size,
                num: num
            },
            success: function (info){
                if(info.success){
                    
                }
                if(info.error == 400){
                    location.href = "login.html?retUrl="+location.href;
                }
            }
        })
    })

})