// 公共文件

//1,添加进度条---nprogress插件
$(document).ajaxStart(function(){
    NProgress.start();
})
$(document).ajaxStop(function(){
    NProgress.done();
})


