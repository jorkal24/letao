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

            location.href = "searchList.html?key="+key;
        }

    });

    


})