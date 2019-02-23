//判断用户是否是登录状态
//发送ajax请求,判断当前是否是登录状态,如果不是,进行登录拦截,跳到登录页

$.ajax({
    type:'get',
    url:'/employee/checkRootLogin',
    dataType:'json',
    success:function(res){
        console.log(res);
        if(!res.success){
            location.href = 'login.html'
        }
    }
})

