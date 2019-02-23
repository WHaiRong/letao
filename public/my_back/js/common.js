// 公共js文件,--->功能多处复用,需要的页面,引入common.js文件即可

// 知识点
//1,    学习使用nprogress插件
//2,    ajax全局事件----jquery官网中api,找到官网中的API,点进ajax,有列举的全局事件,点进去,有详细的用法
//语法: 因为是全局事件,给某个元素注册没有意义,所以要给document注册
//  1>,$(document).ajaxComplete(fn); 所有的ajax完成时,调用fn;不管ajax成功还是失败
//  2>,$(document).ajaxError(fn);只要有ajax失败,就调用fn
//  3>,$(document).ajaxSuccess(fn); 只要有ajax成功,就调用fn
//  4>,$(document).ajaxSend(fn); 每个ajax发送前,都会调用fn
//  5>,$(document).ajaxStart(fn); 第1个ajax发送前,调用fn
//  6>,$(document).ajaxStop(fn); 所有ajax完成时(最后一个ajax完成),调用fn;不管成功还是失败


//功能一,
// 添加进度条,很多地方都要用到进度条,所以写在公共文件里
//  bootstrap中的组件->进度条
//  nprogress.js插件->进度条插件(这里用这个),不依赖其他

//引入了nprogress.js文件后，就有了一个全局对象NProgress对象
//开启进度条
// NProgress.start();
//关闭进度条
// NProgress.done();

//单独使用进度条没有意义,要结合ajax请求数据的进度,使进度条动态变化 
//结合ajax全局事件

// $(document).ajaxStart(function(){
//     //第1个ajax发送前,开启进度条
//     NProgress.start();
// })

// $(document).ajaxStop(function(){
//     //模拟网络加载需要时间的环境,设一个延时器
//     setTimeout(function(){
//         //所有ajax完成时,关闭进度条
//         NProgress.done();
//     },1000);
// })

NProgress.start();


//公用的功能
    //1,左侧侧边栏
    //2,左侧整体菜单的切换
    //3,公共的退出功能

//1>,二级菜单的隐藏与显示
$('.menu .category').on('click',function(){
    $('.child').stop().slideToggle();
})

//2>,整个左侧侧边栏的切换隐藏与显示
$('.topbar .pull-left').on('click',function(){
    $('.aside').toggleClass('hidemenu');
    $('.main').toggleClass('hidemenu');
    $('.topbar').toggleClass('hidemenu');
})

//3>,公共的退出功能---
//  1展示模态框
$('.pull-right').on('click',function(){
    $('.modal').modal({'show':'true','keyboard':'true'});
})
//  2点击模态框的退出按钮,发送ajax请求,让服务端销毁用户的登录状态
$('.out-btn').on('click',function(){
    $.ajax({
        type:'get',
        url:'/employee/employeeLogout',
        dataType:'json',
        success:function(res){
            console.log(res);
            if(res.success == true){
                location.href = 'login.html'
            }
        }
    })
})



    