require.config({
    // baseUrl:'js'


    paths:{
        'jquery':'../lib/jquery/jquery-3.2.1',
        // 'zoom':'../lib/jquery.gdsZoom/jquery.gdsZoom',
        // 'lxCarousel':'../lib/jquery.lxCarousel/jquery.lxCarousel',
    },

    shim:{
    //     // 设置依赖
    //     // 'zoom':['jquery'],
        'common':['jquery'],
    //     // 'lxCarousel':['jquery'],
    }
});
