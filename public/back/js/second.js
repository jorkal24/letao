$(function () {

    var currentPage = 1;
    var pageSize = 5;

    function render() {
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize,
            },
            success: function (info) {
                console.log(info);
                $("tbody").html(template("tpl", info));

                // 分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    totalPages: Math.ceil(info.total / pageSize),
                    onPageClicked: function (a,b,c,page){
                        currentPage = page;
                        render();
                    }
                })
            }
        });
    }

    render();

    // 添加分类功能
    $(".btn_add").on("click" , function (){
        $("#addModal").modal("show");

        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: currentPage,
                pageSize: 100
            },
            success: function (info){
                console.log(info)
                $(".dropdown-menu").html(template("tpl2" , info))
            }
        });       
    })

    // 给下拉框选项注册点击事件
    $(".dropdown-menu").on("click" , "a" , function(){
        $(".dropdown_text").text($(this).text());

        $("[name='categoryId']").val( $(this).data("id") );
        
        $form.data("bootstrapValidator").updateStatus("categoryId" , "VALID");
    });

    // 图片上传

    $("#fileupload").fileupload({
        dataType: "json",
        done: function (e , data){
            // console.log(data);
            $(".img_box img").attr("src" , data.result.picAddr);

            $("[name='brandLogo']").val( data.result.picAddr );

            $form.data("bootstrapValidator").updateStatus("brandLogo" , "VALID");
        }
    });

    

    // 添加表单校验功能

    var $form = $("form");

    $form.bootstrapValidator({
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating:  'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: "请选择一级分类"
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: "请选择二级分类"
                    }
                }
            },
            hot: {
                validators: {
                    notEmpty: {
                        message: "请输入hot值"
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传图片"
                    }
                }
            }
        }
    })
    
    // 校验成事件

    $form.on("success.form.bv" , function (){
        $.ajax({
            type: "post",
            url: "/category/addSecondCategory",
            data: $form.serialize(),
            success: function (info){
                if(info.success){
                    $("#addModal").modal("hide");
                    $form[0].reset();
                    $form.data("bootstrapValidator").resetForm();
                    currentPage = 1;
                    render();

                    $(".dropdown-text").text("请选择一级分类");
                    $("[name='categoryId']").val('');
                    $(".img_box img").attr("src", "images/none.png");
                    $("[name='brandLogo']").val('');
                }
            }
        })
    })



})