
$(function(){
    // 商品详情页,除了头部和底部,其他都是动态渲染的

    //1,根据商品id,发送请求,获取数据,渲染页面-->地址栏获取需要的商品id

    //2,调用common文件中封装的方法,获取地址栏数据
    var productId = getSearch('productId')
    console.log(productId);

    //3,发送请求,渲染数据
    $.ajax({
        type:'get',
        url:'/product/queryProductDetail',
        data:{
            id:productId
        },
        dataType:'json',
        success:function(info){
            console.log(info)
            var htmlstr = template('detailTpl',info)
            $('.lt_main .mui-scroll').html(htmlstr)


            //4,动态渲染出来的轮播图,因为一开始页面中没有html结构及图片,
            //  需要在ajax的成功回调函数中初始化
            //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
            });

            //5,初始化数字框
            mui('.mui-numbox').numbox();

            
        }
    })

});
