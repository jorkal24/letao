// 进度条
NProgress.configure({
    showSpinner: false
});

$(function () {
    $(document).ajaxStart(function () {
        NProgress.start();
    });
    $(document).ajaxStop(function () {
        NProgress.done();
    })
});

// 验证用户是否登陆 
if(location.href.indexOf("login.html") == -1){
    $.ajax({
        type: "get",
        url: "/employee/checkRootLogin",
        success: function (data){
            if(data.error == 400) {
                location.href = "login.html"
            }
        }
    })
}

// 二级下拉菜单的显示和隐藏
$(".child").prev().on("click", function () {
    $(this).next().stop().slideToggle();
});

// 侧边栏的显示和隐藏

$(".icon_menu").on("click", function () {
    $(".lt_aside").toggleClass("now");
    $(".lt_main").toggleClass("now");
    $(".lt-topbar").toggleClass("now");
});


// 退出功能
$(".icon_logout").on("click", function () {
    $("#logoutModal").modal("show");

    $(".btn_logout").off().on("click", function () {
        $.ajax({
            type: "get",
            url: "/employee/employeeLogout",
            success: function (data) {
                if(data.success){
                    location.href = "login.html";
                }
            }
        })
    })
})