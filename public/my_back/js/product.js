$(function(){

    var currentPage = 1;
    var pageSize = 3 ;
    var picArr = [] ; //存储图片路径

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
                // console.log(res);
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
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            dataType:'json',
            success:function(res){
                // console.log(res)
                var htmlstr = template('dropdownTpl',res)
                $('#addUl').html(htmlstr);


            }
        })
    })

//四,给下拉菜单添加可选事件---给a添加(事件委托)
    //   分析:这里的下拉菜单不是input选择框,而是ul>li,所以要手动给它添加可选事件
    $('#addUl').on('click','a',function(){
        //获取a的内容
        var text = $(this).text();
        // console.log(text)
        //a的内容赋值给button
        $('#dropdownText').text(text);

        //获取id,设置给隐藏域
        var id = $('this').data('id')
        //手动将隐藏域校验状态更新成VALID状态
        //2种方法: 1>让该隐藏域触发input事件;2>插件方法$('#form')data('bootstrapValidator').updateStatus('brandId','VALID')
        $('#form').data('bootstrapValidator').updateStatus('brandId','VALID')
    })

//五,图片预览功能---fileupload插件
   $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
            // console.log(data.result);
            var picObj = data.result; //响应回来的结果,是存储图片路径的对象
            //这里可上传多个图片,由打印结果可看出,图片是一个一个响应回来的
            //每一个都是独立的,互不影响
            //1,拿到路径
            var picUrl = picObj.picAddr; 

            //2,动态创建img,并把路径添加给img的src即可实现预览
            $('#imgBox').prepend('<img src="'+ picUrl +'" style="height:100px">')

            //3,把后台响应回来的图片对象,添加到数据里存储---用于判断数组长度,以判断上传了几张图片
            picArr.unshift(picObj);
            // console.log(picArr)

            //4,这里上传的图片用于做轮播图,所以不宜过多,也不能过少,这里要求上传3张即可
            //上传图片的效果: 1,后上传的在前面; 2,如果超过3张,已经上传的后面一张被删除,在前面添加最新上传的
            if(picArr.length > 3){

                //注意: 数组数据与图片数据要保持同步

                //5,数组后面删除一项
                picArr.pop(); 
                //6,找到最后一张图片,让他自杀
                $('#imgBox img:last-of-type').remove();
                // :last-of-type===>css3选择器,表示某个类型的最后一个元素
            }

            //7,更新隐藏域状态
            if(picArr.length === 3){
                $('#form').data('bootstrapValidator').updateStatus('picStatus','VALID')

            }
        }
    });
   
//六,表单校验功能---bootstrapValidator插件
    $('#form').bootstrapValidator({
        //配置排除项
        excluded:[],
        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //配置校验字段
        fields:{
            brandId:{
                validators:{
                    notEmpty:{
                        message:'请选择二级分类'
                    }
                }
            },
            proName:{
                validators:{
                    notEmpty:{
                        message:'请输入商品名称'
                    }
                }
            },
            proDesc:{
                validators:{
                    notEmpty:{
                        message:'请输入商品描述'
                    }
                }
            },
            num:{
                validators:{
                    notEmpty:{
                        message:'请输入商品库存'
                    },
                    //正则校验
                    regexp:{
                        regexp:/^[1-9]\d*$/, //表示非0开头的数字
                        message:'商品库存必须是非零开头的数字'
                    }
                }
            },
            size:{
                validators:{
                    notEmpty:{
                        message:'请输入商品尺码'
                    },
                    regexp:{
                        regexp:/^\d{2}-\d{2}$/,
                        message:'商品尺码,必须是xx-xx格式,如34-46'
                    }
                }
            },
            oldPrice:{
                validators:{
                    notEmpty:{
                        message:'请输入商品原价'
                    }
                }
            },
            price:{
                validators:{
                    notEmpty:{
                        message:'请输入商品现价'
                    }
                }
            },
            picStatus:{
                validators:{
                    notEmpty:{
                        message:'请上传3张图片'
                    }
                }
            }
        }
    });
      
//七,重置表单内容和状态
//注意: 上传图片的表单项,当图片数量为3时,才显示正确状态
    // $('#form').data('bootstrapValidator').resetForm(true)

//八,注册表单校验成功事件
//分析:在表单校验成功事件里要做的事
//     1,阻止默认的提交,通过ajax提交数据
//     2,重置表单内容和状态

    $('#form').on('success.form.bv',function(e){
        //1,阻止默认提交
        e.preventDefault();

        //3,上传数据分析
        // 获取基本数据
        var paramsStr = $('#form').serialize();
        // console.log(paramsStr);
        //图片数据: 这里上传的图片数据,不是文件数据,只是图片路径(即字符串),所以也可以用serialize方法
        //          所以把存储图片路径的数组转成json字符串,拼接在.serialize()获取的数据后面即可
        // 图片数据,后台要求上传一个这样的字符串--->直接把这数组转化成json字符串,拼接在基本数据后面即可
        // picArr: '[{"picName":"xxx.jpg","picAddr":"/upload/product/xx.jpg"},{"picName":"xxx.jpg","picAddr":"/upload/product/xx.jpg"},{"picName":"xxx.jpg","picAddr":"/upload/product/xx.jpg"}]'
        // console.log(JSON.stringify(picArr))
        //.serialize()方法获取的数据-->"brandId=&proName=99"

        //拼接数据
        paramsStr += '&picArr=' + JSON.stringify(picArr);

        console.log(11)
        //2,发送ajax请求
        $.ajax({
            type:'post',
            url:'/product/addProduct',
            dataType:'json',
            data:paramsStr,
            success:function(res){
                console.log(res);

                if(res.success){
                    //关闭模态框
                    $('#productModal').modal('hide')
                    //重新渲染表格,默认第1页
                    currentPage = 1;
                    render();
                    // 重置表单---button和img需要手动重置
                    $('#form').data('bootstrapValidator').resetForm(true);
                    $('#dropdownText').text('请选择二级分类');
                    $('#imgBox img').remove();
                    //数组数据要同步
                    picArr = [];
                }

            }
        })
    })




})


