$(function(){

    //注意: 进入购物车,需要判断用户是否登录,

    // 获取数据,渲染添加到购物车的数据

    render();

    function render(){
        $.ajax({
            type:'get',
            url:'/cart/queryCart',
            dataType:'json',
            success:function(res){
                console.log(res);
                if(res.error == 400){
                    //如果未登录,到登录页面去登录,登录完再跳回当前页面
                    location.href = 'login.html?retUrl=' + location.href;
                    return
                }
                var htmlstr = template('cartTpl',{list : res})
                $('.lt_main ul').html(htmlstr);
    
            }
        })
    }


    //删除功能
    $('.lt_main ul').on('click','.btn_delete',function(){

        var id = $(this).data('id')

        $.ajax({
            type:'get',
            url:'/cart/deleteCart',
            dataType:'json',
            data:{
                // {"id":[1,2,3]},后台要求参数是一个数组,
                id: [id]
            },
            success:function(res){
                console.log(res)
                if(res.success){
                    render();
                }
            }
        })
    })





});