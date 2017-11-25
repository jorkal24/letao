$(function (){

    var key = tools.getSearch("key");
    $(".search_input").val(key);

    render();
    // 点击搜索功能

    $(".search_btn").on("click" , function (){

        $(".lt_sort").find("a").removeClass("now");
        $(".lt_sort").find("span").removeClass("fa-angle-up").addClass("fa-angle-down")
        render();
    })

    // 点击排序功能

    $(".lt_sort [data-type]").on("click" , function (){
        if($(this).hasClass("now")){
            $(this).find("span").toggleClass("fa-angle-down").toggleClass("fa-angle-up")
        }else {
            $(this).addClass("now").siblings().removeClass("now");
            $(".lt_sort span").removeClass("fa-angle-up").addClass("fa-angle-down");
        }
        
        render();
    })



    // 获取地址栏参数

    function render (){
        $(".lt_product").html('<div class="loading"></div>');

        var param = {};
        param.page = 1;
        param.pageSize = 100;    
        param.proName = $(".search_input").val().trim();

        var $now = $(".lt_sort .now");
        if($now.length != 0){
            var type = $now.data("type");
            var value = $now.find("span").hasClass("fa-angle-up")? 1 : 2;
            param[type] = value;
        }

        $.ajax({
            type: "get",
            url: "/product/queryProduct",
            data: param,
            success: function (info){
                
                setTimeout(function(){
                    $(".lt_product").html(template("tpl" , info))
                },1000)
                
            }
        })
    }
    

})