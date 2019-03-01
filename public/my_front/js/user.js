$(function(){

    // 发送请求,获取数据,渲染用户中心页面
    
    render();

    function render(){
        $.ajax({
            type:'get',
            url:'/user/queryUserMessage',
            dataType:'json',
            success:function(res){
                console.log(res)
                var htmlstr = template('userTpl',res)
                $('#userInfo').html(htmlstr)
            }
        })
    }


    //退出功能
    $('#logout').on('click',function(){
        $.ajax({
            type:'get',
            url:'/user/logout',
            dataType:'json',
            success:function(res){
                console.log(res)
                if(res.success){
                    location.href = 'login.html'
                    render()
                }
            }
        })
    })



});