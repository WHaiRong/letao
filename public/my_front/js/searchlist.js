
$(function(){

    //分析:
    //    1,点击搜索,跳转到搜索列表页,并且列表页的搜索框要出现在搜索页输入的关键字
    //      即页面与页面之间有数据传输
    //    2,根据关键字,渲染与搜索关键字对应的数据

    //1,调用getSearch方法,获取搜索关键字
    var key = getSearch('value'); //地址栏后面拼接数据时,用的什么键名,这里获取时就传什么键的参数进去
    console.log(key)

    //2,key赋值给这里的搜索框
    $('.search_input').val(key);

    //在当前搜索列表页面,用户搜索商品时可能会改动关键字,那么当前搜索框
    //的数据与地址栏的就不一样了,
    //发送ajax请求时,应该以当前搜索栏的关键字为准 
    // var keyName = $('.search_input').val();

    render();

    function render(){

        //需要向后台传的参数--一个对象
        var paramsObj = {};
        //3个必传的参数
        paramsObj.proName = $('.search_input').val();
        paramsObj.page = 1;
        paramsObj.pageSize = 100;
        //2个,可传参数;根据是否需要排序,决定是否传
        //即根据是否有高亮的a,决定是否需要传参,进行排序
        var $current = $('.sort a.current'); //表示获取sort里a标签有current类的元素,
                                             //获取结果是个伪数组,即如果a上有current类,$current有长度
                                             //如果没有current类,$current没有长度
        console.log($current);

        if($current.length == 1){
            //如果有高亮的a,需要排序
            // var price = $current.find('i').hasClass('fa-angle-up') ? 1 : 2
            // 把后台需要的参数键值,添加到paramsObj中
            // paramsObj.price = $current.find('i').hasClass('fa-angle-up') ? 1 : 2
            //注意: 这么写当前高亮的是哪一个无法判断,即无论哪一个高亮都会按照价格来排序,无法识别是要
            //      按照价格还是要按照库存来排序;  
            //      方法:(1),根据下标区分(较麻烦); (2),在标签上用自定义属性存储
            
            var type = $current.data('type'); //price或num
            var typeValue = $current.find('i').hasClass('fa-angle-up') ? 1 : 2 ; //键的值

            //添加到paramsObj对象中
            paramsObj[type] = typeValue;
        
        }
        //排序功能写完,但是是重新渲数据,否则没效果

        console.log(paramsObj)

        //6,(2)
        setTimeout(function(){


            //3,根据搜索关键字,发送请求获取数据,动态渲染商品列表
            $.ajax({
                type:'get',
                url:'/product/queryProduct',
                dataType:'json',
                // data:{
    
                //     //后台要求的必传参数有3个
                //     proName:$('.search_input').val(), //商品名字
                //     page:1, //第几面
                //     pageSize: 100 //每页几条
    
                //     //如果需要排序,需要传排序的参数:
                //     //5,(4)判断是否需要排序? 就看有没有高亮的a
    
                //     // price:  //使用价格排序（1升序，2降序）
                //     // num: //产品库存排序（1升序，2降序）
                // },
                data:paramsObj,
                success:function( info ){
                    console.log(info)
                    var htmlstr = template('searchlistTpl',info)
                    $('.content').html(htmlstr);
                }
            })

        },1000)
    }

    //4,点击当前页面的搜索按钮,发送请求,渲染数据
    $('.search_btn').on('click',function(){
        render()
    })


    //5,排序功能及高亮效果
    //分析:
    //  (1),如果本身没有current类,添加上current,排他,实现高亮
    //  (2),如果本身有current类,切换箭头的方向,-->切换箭头类名fa-angle-up  fa-angle-down,实现排序
    $('.sort a').on('click',function(){
        if($(this).hasClass('current')){
            //有类,切换箭头方向
            $(this).find('i').toggleClass('fa-angle-up').toggleClass('fa-angle-down')
        }else{
            //没有类,
            $(this).addClass('current').siblings().removeClass('current')
        }

        //(3)根据箭头方向,渲染数据--->去封装的ajax里,添加排序参数

        //(5)重新渲染
        render();
    })


    //6,添加加载中的动画效果
    //(1),在结构中放一个盒子做加载效果的模具,用css添加动画效果,让页面延迟加载,就能
    //    看到正在加载的动画效果

    //加个延时器,模拟网络加载延迟的效果,在延时器里发送ajax请求,渲染数据
    //所以把延时器放到render里,包裹ajax的地方 
    
});


    