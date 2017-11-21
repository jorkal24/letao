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

// 二级下拉菜单的显示和隐藏
$(".child").prev().on("click", function () {
    $(this).next().stop().slideToggle();
});

// 侧边栏的显示和隐藏

$(".icon_menu").on("click", function () {
    $(".lt_aside").toggleClass("now");
    $(".lt_main").toggleClass("now");
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