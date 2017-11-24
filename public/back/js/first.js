$(function (){

    var currentPage = 1;
    var pageSize = 10;
    
    function render (){
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (data){
                // console.log(data);
                $("tbody").html(template("tpl" , data));
    
                // 添加分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion : 3,
                    currentPage: currentPage,
                    totalPages: Math.ceil(data.total / pageSize),
                    onPageClicked: function (a,b,c,page){
                        currentPage = page;
                        
                        render();
                    } 
                })
            } 
        })
    }

    render();

    // 添加分类功能 
    $(".btn_add").on("click" , function (){
        $("#addModal").modal("show");
    });

    // 添加表单校验
    var $form = $("#form");
    $form.bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh' 
        },
        fields: {
            categoryName: {
                validators: {
                   notEmpty:{
                       message: "分类名不能为空"
                   }
               }
            }
        }
    });
    $form.on("success.form.bv" , function (e){
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/category/addTopCategory",
            data: $form.serialize(),
            success: function (data){
                if(data.success) {
                    $form.data("bootstrapValidator").resetForm();
                    $("#addModal").modal("hide");
                    render();
                }
            }
        })
    })

})