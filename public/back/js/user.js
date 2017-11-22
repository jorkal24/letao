$(function (){

   

    var currentPage = 1;
    var pageSize = 5;
    function render (){
        $.ajax({
            type: "get",
            url: "/user/queryUser",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (data){
                // console.log(data);
                var html = template("tpl" , data);
                $("tbody").html(html);
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    totalPages: Math.ceil((data.total / pageSize)),
                    onPageClicked: function (a,b,c,page){
                        currentPage = page
                        render();
                    }
                })
            }
        });
    }

    render();

    // 用户操作功能
    $("tbody").on("click" , "button" , function(){
        var id = $(this).parent().data("id");
        $("#userModal").modal("show");
        $(".btn_confirm").off().on("click" , function (){
            $.ajax({
                type: "post",
                url: "/user/updateUser",
                data: {
                    id: id,
                    isDelete: $(this).hasClass("btn_success") ? 1 : 0
                },
                success: function (data){
                    console.log(data);
                    if(data.success){
                        $("#userModal").modal("hide");
                        render();
                    }
                }
            })
        })
    })
    
})