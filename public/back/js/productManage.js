$(function () {

    var currentPage = 1;
    var pageSize = 2;
    var imgs = [];

    render();

    function render() {
        $.ajax({
            type: "get",
            url: "/product/queryProductDetailList",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (info) {
                $("tbody").html(template("tpl", info));
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    totalPages: Math.ceil((info.total / pageSize)),
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page,
                            render();
                    },
                    itemTexts: function (type, page, current) {
                        switch (type) {
                            case "first":
                                return "首页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "尾页";
                            default:
                                return page;
                        }
                    },
                    tooltipTitles: function (type, page, current) {
                        switch (type) {
                            case "first":
                                return "首页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "尾页";
                                //如果是page，说明就是数字，只需要返回对应的数字即可
                            default:
                                return "跳转到" + page;
                        }
                    },
                    useBootstrapTooltip: true
                })
            }
        })
    }

    // 添加分类模态框
    $(".btn_add").on("click", function () {
        $("#addModal").modal("show");
        // 发送ajax请求,获取二级菜单数据
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: currentPage,
                pageSize: 100
            },
            success: function (info) {
                console.log(info);
                $(".dropdown-menu").html(template("tpl1", info));
            }
        })
    })

    // 给二级分类选项中的a注册委托点击事件
    $(".dropdown-menu").on("click", "a", function () {

        $(".dropdown_text").text($(this).text());

        $("[name=brandId]").val($(this).data("id"));

        $form.data("bootstrapValidator").updateStatus("brandId", "VALID");
    });


    // 添加表单校验
    var $form = $("form");
    $form.bootstrapValidator({
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: "请选择二级分类"
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: "商品名称不能为空"
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: "商品描述不能为空"
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: "请输入商品的库存"
                    },
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: "请输入合法库存"
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: "请输入尺码"
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: "请输入合法的尺码例如32-46"
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: "请输入商品的原价"
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: "请输入商品的价格"
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传3张图片"
                    }
                }
            }
        }
    });

    // 上传图片
    $("#fileupload").fileupload({
        dataType: "json",
        done: function (e, data) {
            console.log(data);
            if (imgs.length >= 3) {
                return false;
            }
            // 将图片显示到页面中
            $(".img_box").append('<img src="' + data.result.picAddr + '" width="100" height="100" alt="">');
            // 将图片的信息存储起来
            imgs.push(data.result)
            // 通过数组长度判断上传数量
            if (imgs.length == 3) {
                $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
            } else {
                $form.data("bootstrapValidator").updateStatus("brandLogo", "INVALID");
            }
        }
    });

    // 表单校验成功后
    $form.on("success.form.bv", function (e) {
        e.preventDefault();
        // 发送ajax请求
        var param = $form.serialize();
        console.log(param)

        param += "&picName1=" + imgs[0].picName + "&picAddr1=" + imgs[0].picAddr;
        param += "&picName2=" + imgs[1].picName + "&picAddr2=" + imgs[1].picAddr;
        param += "&picName3=" + imgs[2].picName + "&picAddr3=" + imgs[2].picAddr;

        $.ajax({
            type: "post",
            url: "/product/addProduct",
            data: param,
            success: function (info) {
                if (info.success) {
                    // 重置表单
                    $form.data("bootstrapValidator").resetForm();
                    $form[0].reset();
                    // 隐藏模态框
                    $("#addModal").modal("hide");
                    // 重新渲染第一页
                    currentPage = 1;
                    render();

                    $(".dropdown-text").text("请选择二级分类");
                    $("[name='brandId']").val('');
          
                    //重置图片
                    $(".img_box img").remove();
                    imgs = [];          
                }
            }
        })
    })


})