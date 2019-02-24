
$(function(){

    var pageSize = 5;  //每页条数 
    var currentPage = 1; //当前页码


    //一,发送ajax请求,渲染表格 
    render();
    function render(){
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            dataType:'json',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(res){
                // console.log(res);
                var htmlstr = template('firstTpl',res);
                $('tbody').html(htmlstr);

                //分页初始化
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:1,//当前页
                    totalPages:Math.ceil(res.total/pageSize),//总页数
                    size:"normal",//设置控件的大小，mini, small, normal,large
                    // onPageClicked:function(event, originalEvent, type,page){
                    //   //为按钮绑定点击事件 page:当前点击的按钮值,前3个参数可以不写,但是必须有变量点位
                    // }
                    onPageClicked:function(a,b,c,page){
                        currentPage = page;
                        render();
                    }
                })
                  
            }
        })
    }

    //二,点击添加分类按钮,实现添加功能
    $('#addBtn').on('click',function(){

        $('#firstModal').modal('show');


    })














});