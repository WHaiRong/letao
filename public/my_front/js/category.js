
$(function(){
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false,
    });
    
    //1, 动态渲染左侧导航
    $.ajax({
        type:'get',
        dataType:'json',
        url:'/category/queryTopCategory',
        success:function(res){
            // console.log(res);
            var htmlstr = template('navTpl',res)
            $('.category_left ul').html(htmlstr);
        
            //默认一进入页面就渲染第1个一级导航的二级分类
            renderById( res.rows[0].id); //第一项,不一定id为1,
        }
    })


    //2, 左侧导航的切换功能---注册点击事件(事件委托)
    $('.category_left').on('click','a',function(){
        //移除所有a的current类
        $('.category_left a').removeClass('current');
        //给当前a添加current类
        $(this).addClass('current');
        //渲染对应的二级分类-->通过id找到对应的二级分类数据
        var id = $(this).data('id');
        renderById(id);

    })

    //封装请求二级分类数据,渲染二级分类的函数
    function renderById( id ){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategory',
            data:{
                id: id  //函数传进来的参数
            },
            dataType:'json',
            success:function(res){
                console.log(res);
                var htmlstr = template('secTpl',res)
                $('.category_right ul').html(htmlstr);

            }
        })
    }


});
