
// 判断是否登录
// 如果没有登录,进行登录拦截,跳转到登录页面让用户登录
$(function(){
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
});