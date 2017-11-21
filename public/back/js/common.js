
NProgress.configure({showSpinner: false});

$(function (){
    $(document).ajaxStart(function (){
        NProgress.start();
    });
    $(document).ajaxStop(function (){
            NProgress.done();
    })
});