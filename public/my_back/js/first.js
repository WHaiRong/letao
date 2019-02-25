
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
                console.log(res);
                var htmlstr = template('firstTpl',res);
                $('tbody').html(htmlstr);

                //分页初始化
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:res.page,//当前页
                    totalPages:Math.ceil(res.total/res.size),//总页数
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
        //展示模态框
        $('#firstModal').modal('show');
    })

    //三,完成添加校验
    //使用表单校验插件
    $('#form').bootstrapValidator({
    
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
        },
        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            categoryName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '添加内容不能为空'
                    }
                }
            }
        }
    
    });

    //四,注册表单校验成功事件,并阻止默认的提交,通过ajax请求提交数据
    $("#form").on('success.form.bv', function (e) {
        //阻止submit按钮的默认提交
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            type:'post',
            url:'/category/addTopCategory',
            data:{                                          //获取表单数据并拼接成字符串的方法3种
                categoryName: $('.addCate').val()           //1,data:{   直接获取input内容                                       //获取表单数据并拼接成字符串的方法3种
            },                                              //      categoryName: $('.addCate').val()
                                                            //  }                                            
            dataType:'json',                                //2,serialize()方法,不能获取文件数据,直接拼接成键值对的字符串
            success:function(res){                          // data:$('#form').serialize();
                console.log(res);                           //3,XMLHttpRequest新功能,formData管理表单,即可获取表单数据,也可以获取文件数据
                //如果成功--关闭模态框,重新渲染页面            //  使用:(1)实例化一个对象,var f = new FormData(表单元素,必须是个dom对象)
                $('#firstModal').modal('hide');             //       (2)发送数据时,传f即可,如xhr.send(f)
                //重新渲染页面默认第1页                       //       (3)formData.append(键,值)
                currentPage = 1;                            //  使用时,必须是post请求,不需要设置请求头
                render();
                //表单内容和状态都要重置
                $('#form').data('bootstrapValidator').resetForm(true)
            }
        })
    });














});