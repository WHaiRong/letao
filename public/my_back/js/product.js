$(function(){

    var currentPage = 1;
    var pageSize = 3 ;

    render();

//一,渲染列表
    function render(){

        $.ajax({
            type:'get',
            url:'/product/queryProductDetailList',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:'json',
            success:function(res){
                console.log(res);
                var htmlstr = template('productTpl',res);
                $('tbody').html(htmlstr);

                //二,分页器初始化
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:currentPage,//当前页
                    totalPages:Math.ceil(res.total/pageSize),//总页数
                    size:"normal",//设置控件的大小，mini, small, normal,large
                    onPageClicked:function(a, b, c,page){
                      //为按钮绑定点击事件 page:当前点击的按钮值
                      currentPage = page;
                      render();
                    }
                })
            }
        })
    }

//三,模态框
    $('#addProduct').on('click',function(){
        //显示模态框
        $('#productModal').modal('show');
        //渲染二级分类列表
        $.ajax({
            
        })
    })


    
      



})


