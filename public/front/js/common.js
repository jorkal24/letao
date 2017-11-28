mui( '.mui-scroll-wrapper' ).scroll( {
    deceleration: 0.0005,
    indicators: false,
    bounce: true
} );
mui( '.mui-slider' ).slider( {
    interval: 1000
} );

var tools = {
    getSearchObj: function (){
        var search = location.search;
        search = decodeURI(search);
        search = search.slice(1);
        var arr = search.split("&");

        var obj = {}
        arr.forEach(function (ele , i){
            var key = ele.split("=")[0];
            var value = ele.split("=")[1];
            obj[key] = value;
        });
        return obj;
    },
    getSearch: function(key){
        return this.getSearchObj()[key];
    }
}