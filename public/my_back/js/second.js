
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
                // console.log(info);
                var htmlstr = template('addTpl',info);
                $('#addUl').html(htmlstr);               
            }
        })
    })

//三,给下拉菜单添加可选功能
//  这里的下拉菜单不是select结构,而是ul,没有选择功能--手动添加选择功能
    $('#addUl').on('click','a',function(){
        //点击a时,把值赋给button
        var atext = $(this).text();
        $('#dropdownText').text(atext);

        //接口文档-->后台要求传一个所属分类的id--向后台传输的不是当前选择的一级分类的名称,而是一个id
        //-->渲染数据时就自定义属性存储  当前用来选择的框,不是form表单项,需要添加一个隐藏域,用来上传数据
        //获取id
        var id = $(this).data('id');
        //把这个id设置给隐藏域--->那么提交数据时,这个隐藏域提交的就是categoryId=这个id值,即id值即为隐藏域的value值,然后提交给后台
        $('[name="categoryId"]').val(id);

        //只要给隐藏域赋值了,此时校验状态应该更新成成功
        $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID');
    })

//四,完成文件上传初始化(图片上传预览)--->fileupload插件
    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        //文件上传完成的回调函数
        done:function (e, data) {
        //   console.log(data);
        //   console.log(data.result);
          //响应回来的数据是图片路径,存在data的result里
        //   console.log(data.result.picAddr);

          var result = data.result; //后台返回的结果
          var picUrl = result.picAddr ; //获取返回的图片路径

          //
          //路径赋值给img的src,即可预览图片
          $('#imgBox img').attr('src',picUrl);
         
            //把路径赋值给隐藏域,才能提交数据
            $("[name='brandLogo']").val(picUrl)

           //只要隐藏域有值了,就是更新成成功状态
           $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID')
        }
    });
    
    
//五,直接进行表单校验
    // $('#form').bootstrapValidator({
    //     //配置excluded排除项,对隐藏域完成校验
    //     excludeed:[],
    //     // 配置图标
    //     feedbackIcons: {
    //       valid: 'glyphicon glyphicon-ok',
    //       invalid: 'glyphicon glyphicon-remove',
    //       validating: 'glyphicon glyphicon-refresh'
    //     },
    //     //配置校验字段
    //     fields:{
    //         categoryId:{
    //             validators:{
    //                 notEmpty:{
    //                     message:'请选择一级分类'
    //                 }
    //             }
    //         },
    //         brandName:{
    //             validators:{
    //                 notEmpty:{
    //                     message:'请输入二级分类名称'
    //                 }
    //             }
    //         },
    //         brandLogo:{
    //             validators:{
    //                 notEmpty:{
    //                     message:'请选择图片'
    //                 }
    //             }
    //         }
    //     }
    
    // });

   

    $('#form').bootstrapValidator({
        // 配置 excluded 排除项, 对隐藏域完成校验
        excluded: [],
    
        // 配置图标
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',
          invalid: 'glyphicon glyphicon-remove',
          validating: 'glyphicon glyphicon-refresh'
        },
    
        // 配置校验字段列表
        fields: {
          // 选择一级分类
          categoryId: {
            validators: {
              notEmpty: {
                message: '请选择一级分类'
              }
            }
          },
          // 输入二级分类名称
          brandName: {
            validators: {
              notEmpty: {
                message: '请输入二级分类名称'
              }
            }
          },
          // 二级分类图片
          brandLogo: {
            validators: {
              notEmpty: {
                message: '请选择图片'
              }
            }
          }
        }
      });


//六,注册表单校验成功事件,并阻止默认的提交,通过ajax提交数据
//分析: 点击添加按钮,提交数据--地址上只有brandName=xxx , 而没有一级分类和图片数据--给他们添加隐藏域
//      专门用于提交数据,用户也看不到

    $('#form').on('success.form.bv',function(e){
        e.preventDefault();

        $.ajax({
            type:'post',
            url:'/category/addSecondCategory',
            data:$('#form').serialize(),
            //这里的获取文件数据,不是图片数据,而是字符串地址,所以可以用serialize方法
            dataType:'json',
            success:function(res){
                console.log(res);
                if(res.success){
                    //如果成功
                    //关闭模态框
                    $('#secondModal').modal('hide');
                    //重新渲染表格,默认展示第1而
                    currentPage = 1;
                    render();
                    //重置表单的内容的状态
                    $('#form').data('bootstrapValidator').resetForm(true);
                    //button和img不是表单元素,要手动重置
                    $('#dropdownText').text('请选择一级分类');
                    $('#imgBox img').attr('src','./images/none.png')
                }
            }
        })
    })



});

