$(function(){

    $('#loginBtn').on('click',function(){
        var username = $('#username').val().trim();
        var password = $('#password').val().trim();

        if(username === ''){
            mui.toast('请输入用户名')
            return
        }
        if(password == ''){
            mui.toast('请输入密码')
            return
        }

        //向后台发送请求,验证登录
        $.ajax({
            type:'post',
            url:'/user/login',
            dataType:'json',
            // data:$('#form').serialize(),
            data: {
                username: username,
                password: password
            },
            success:function(res){
                console.log(res);
                if(res.error == 403){
                    mui.toast('用户名或密码错误')
                    return
                }
                if(res.success){
                    location.href = 'cart.html'
                    //如果是从加入购物车跳到的登录页,登录成功后,需要再跳回商品详情页,让用户继续添加商品到购物车
                    //如果只是登录,跳到用户个人中心页面即可
                }
            }
        })
    })
    




});