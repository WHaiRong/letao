
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


    //6,给页码添加可选功能
    $('.lt_main').on('click','.lt_size span',function(){
        $(this).addClass('current').siblings().removeClass('current');
    })

    //7,加入购物车功能
    $('#addCart').on('click',function(){
        //判断是否选了尺码和数量

        //获取尺码和数量
        var size = $('.lt_size span.current').text();
        console.log(size);
        var num = $('.mui-numbox input').val();
        console.log(num);

        if(!size){
            mui.toast('请选择尺码');
            return;
        }

        $.ajax({
            type:'post',
            url:'/cart/addCart',
            dataType:'json',
            data:{
                productId: productId, //产品id
                size: size, //产品尺码
                num : num //产品数量
            },
            success:function( res ){
                console.log(res);
                //要判断用户是否登录,如果登录,跳转到购物车页面
                //如果没有登录,跳转到登录页面,用户登录后,再回当前页面

                if(res.error == 400){
                    //未登录,登录完成后,需要再跳回来,所以需要在地址栏后面拼接参数
                    location.href = 'login.html?retUrl=' + location.href;
                    //这行代码即表示,先跳到login.html页面,再跳回当前页
                }



                mui.confirm('加入成功','温馨提示',['去购物车','继续浏览'],function(e){
                    // e.index 用于标记选择的按钮的下标
                    if(e.index == 0){
                        //如果用户选择了'去购物车'按钮
                        location.href = 'cart.html'
                    }
                })
            }
        })

    })

});
