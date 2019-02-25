
$(function(){

    var currentPage = 1;//标记当前页码
    var pageSize = 5; //每页条数

//一,渲染表格

    render();
    function render(){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:'json',
            success:function(res){
                // console.log(res);
                var htmlstr = template('secondTpl',res);
                $('tbody').html(htmlstr);
    
                //在ajax成功的回调函数里,实现分页初始化
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,  //配置版本
                    currentPage:currentPage, //当前页
                    totalPages: Math.ceil(res.total/pageSize) ,  //总页数
                    size:'normal',
                    //回调函数
                    onPageClicked:function(a,b,c,page){
                        //page是当前页码
                        // console.log(page);
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }

//二,添加功能
//  1,点击添加分类按钮,展示模态框
//  2,点击模态框里的添加,发送ajax请求,添加数据
//  点击添加分类按钮时,就要请求模态框里下拉菜单下的列表数据

    $('#confirmAdd').on('click',function(){
        //展示模态框
        $('#secondModal').modal('show'); 
        
        //渲染下拉菜单列表
        //当选择了一级菜单里,选择的内容应该显示在上面的按钮区--把下拉菜单选择
        //的内容赋值给上面的button
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data: {
                page:1,
                pageSize:100
            },
            dataType:'json',
            success:function(info){
                console.log(info);
                var htmlstr = template('addTpl',info);
                $('#addUl').html(htmlstr);               
            }
        })
    })

//三,这里的下拉菜单不是select结构,而是ul,没有选择功能--手动添加选择功能

    $('#addUl').on('click','a',function(){
        //点击a时,把值赋给button
        var atext = $(this).text();
        $('#dropdownText').text(atext);
    })




});