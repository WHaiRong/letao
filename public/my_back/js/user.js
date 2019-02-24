
$(function(){

// 一进页面就发送请求,渲染数据

    var currentPage = 1;  //当前页码
    var pageSize = 5;  //每页数据条数
    var currentId ;  //标记当前正在编辑的用户id
    var isDelete ;   //标签修改用户成为什么状态

//一,根据数据渲染表格
    render();
    //封装ajax
    function render(){
        $.ajax({
            type:'get',
            url:'/user/queryUser',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:'json',
            success:function( res ){
                // console.log(res);
                var htmlstr = template('tpl',res);
                $('tbody').html(htmlstr);
    
                //根据响应回来的数据,进行分页初始化
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:res.page,
                    totalPages:Math.ceil(res.total/pageSize),
                    size:'normal',
                    onPageClicked:function(a, b, c,page){
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        // console.log(page);
                        currentPage = page;
                        render();
                    } 
                })
            }
        })
    }

// 分页初始化
// $("#paginator").bootstrapPaginator({
//   bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
//   currentPage:1,//当前页
//   totalPages:10,//总页数
//   size:"small",//设置控件的大小，mini, small, normal,large
//   onPageClicked:function(event, originalEvent, type,page){
//     //为按钮绑定点击事件 page:当前点击的按钮值
//   }
// });
      
//二,实现禁用启用按钮功能
//1,首先要展示模态框
//2,根据接口文件---修改用户状态需要的数据是id用户id,与isDelete是否启用停用
$('tbody').on('click','.btn',function(){
    // console.log(11);
    //分析:想要改变当前用户的状态,就要找到当前用户---通过用户标识id找--在标签上存储用户id
    
    //获取id
    currentId = $(this).parent().data('id'); //当前用户id,后面还要用,所以声明一个全局变量
    //展示模态框
    $('#userModal').modal('show');
    //获取要修改成什么状态"
    isDelete = $(this).hasClass('btn-danger') ? '0' : '1';
    // console.log(isDelete);
})

//给模态框的确定按钮注册点击事件
$('#confirmBtn').on('click',function(){
    $.ajax({
        type:'post',
        url:'/user/updateUser',
        data:{
            id:currentId,
            isDelete:isDelete
        },
        dataType:'json',
        success:function(res){
            // console.log(res)
            //隐藏模态框
            $('#userModal').modal('hide');
            //渲染页面
            render();
        }
    })
})





});