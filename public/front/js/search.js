$(function (){

    // 渲染搜索历史 ,将lt_search_history定义为localStorage的key
    function getHistory (){
        var history = localStorage.getItem("lt_search_history") || '[]';

        var arr = JSON.parse(history);

        return arr;
    }

    function render (){
        var arr = getHistory();
        $(".lt_history").html(template("tpl" , {data:arr}))
    }

    render();

    // 清空搜索列表

    $(".lt_history").on("click" , ".btn_empty" , function (){
        localStorage.removeItem("lt_search_history");
        render();
    });

    // 删除搜索列表
    $(".lt_history").on("click", ".btn_delete" , function (){
        var that = this;
        mui.confirm("温馨提示", "确定要这条搜索记录",function (e){
            if(e.index == 1){
                var arr = getHistory();
                var index = $(that).data("index");

                arr.splice(index , 1);
                localStorage.setItem("lt_search_history" , JSON.stringify(arr));
                render();
            }
        })
    })

    // 添加搜索历史

    $(".search_btn").on("click" , function (){
        var key = $(".search_input").val().trim();

        if(key === ""){
            mui.toast("请输入关键字");
            return false;
        }else{
            var arr = getHistory();

            var index = arr.indexOf(key);
            if(index != -1){
                arr.splice(index , 1);
            }
            if(arr.lenght >= 10){
                arr.pop();
            }

            arr.unshift(key);
            localStorage.setItem("lt_search_history" , JSON.stringify(arr));

            render();
            $(".search_input").val("");
            location.href = "searchList.html?key="+key;
        }

    });
})

// $(function () {

//     // 渲染搜索记录 lt_search_history约定为localStorage存取的key
//     render();

//     //清空历史记录功能

//     $(".lt_history").on("click" , ".btn_empty" , function (){
//         localStorage.removeItem("lt_search_history");
//         render();
//     });

//     // 删除功能
//     $(".lt_history").on("click" , ".btn_delete" , function (){
//         var that = this;
//         mui.confirm("温馨提示" , "确定要删除这条历史记录?", function (e){
//             if(e.index == 1){
//                 var arr = getHistory();
//                 var index = $(this).data("index");
//                 arr.splice(index , 1);
//                 localStorage.setItem("lt_search_history" , JSON.stringify(arr));
//                 render();
//             }
//         })
//     });
//     // 添加搜索记录并删除
//     $(".search_btn").on("click" , function (){

//         var key = $(".search_input").val().trim();
//         console.log(key);
//         if(key === ""){
//             mui.toast("请输入搜素内容");
//             return false;
//         }else {
//             var arr = getHistory();
//             var index = arr.indexOf(key);

//             if(index != -1){
//                 arr.splice(index , 1);
//             }
//             if(arr.length >=10){
//                 arr.pop();
//             }
//             arr.unshift(key);
//             localStorage.setItem("lt_search_history" , JSON.stringify(arr));
//             render();
//             $(".search_input").val("")
//         }
//     })



//     function getHistory() {
//         var history = localStorage.getItem("lt_search_history") || '[]';

//         arr = JSON.parse(history);

//         return arr;
//     }

//     function render (){
//         var arr = getHistory();

//         $(".lt_history").html(template("tpl", {data: arr}));
//     }

    


// })