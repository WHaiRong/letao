 
 //1,校验用户名和密码不能为空及字符长度
 //2,更改提示信息的方式--alert改为利用插件提示
 //3,实现重置按钮功能--1,重置内容2,重置校验状态---bootstrapValidator插件中的方法
 //     var validator = $("#form").data('bootstrapValidator');  //获取表单校验实例
//      使用表单校验实例可以调用一些常用的方法。
//      validator.methodName(params);
 //     使用updateStatus(field, status, validatorName)`方法更新字段的状态
 //4,点击登录,发送ajax请求,如果密码和用户名都正确--跳转到首页
 //5,添加进度条---进度条多处都用,可写在公共文件中

//  基于bootstrap的bootstrapValibator插件,用于表单校验
 //1,校验用户名与密码
 //使用表单校验插件



$('#form').bootstrapValidator({
  
    //2. 配置图标，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
  
    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在2到6之间'
          },
          callback:{
              message:'用户名错误'
          }
        }
      },
      password: {
          validators:{
              notEmpty:{
                  message:'密码不能为空'
              },
              stringLength:{
                  min:6,
                  max:12,
                  message:'密码长度必须在6到12之间'
              },
              callback:{
                  message:'密码错误'
              }
          }
      }
    }
});
// 当表单校验成功时，会触发`success.form.bv`事件(内置事件)
$("#form").on('success.form.bv', function (e) {
    //1,阻止input的默认提交方式
    e.preventDefault();
    //2,使用ajax提交数据
    $.ajax({
        url:'/employee/employeeLogin',
        type:'post',
        // data:{"username":"root","password":"123456"},
        //与后台交互传递的是json字符串---所以不能直接传个对象
        data:$('#form').serialize(),
        //jquery中的方法,可以将表单中有name属性的表单项的键和值拼接成键值对的字符串
        //(不能获取文件数据),可直接用于数据传递
        dataType:'json',
        success:function(res){
            console.log(res);
            
            if(res.error == 1001){
                // alert('密码错误')
                $("#form").data('bootstrapValidator').updateStatus('password','INVALID','callback');  //获取表单校验实例
            }
            if(res.error == 1000){
                // alert('用户名错误')
                $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback')
            }
            if(res.success){
                location.href = 'index.html'
            }
        }
    })
});


// var validator = $("#form").data('bootstrapValidator');  //获取表单校验实例
//使用表单校验实例可以调用一些常用的方法。
// validator.methodName(params);
// 可以使用`updateStatus(field, status, validatorName)`方法更新字段的状态
// - INVALID ：校验失败的  - VALID：校验成功的。


//重置功能---重置内容和检验状态(即显示对应图标)
// validator.resetForm(参);//重置表单，并且会隐藏所有的错误提示和图标
//参数为true时,表示重置内容和状态,为false时,表示重置状态;
//submit按钮本身就具备重置内容的功能,所以这里只重置状态即可
$('[type="reset"]').click(function(){
    //用表单的实例,调用方法
    $('#form').data('bootstrapValidator').resetForm(false);
})



