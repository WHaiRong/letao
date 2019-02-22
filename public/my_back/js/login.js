//功能一: 完成表单校验
//        利用bootstrapValidator插件(基于bootstrap)
//功能二: 阻止submit按钮的默认跳转
//        2种方法: 1,函数内return false,但是这种方法不推荐,因为如果return false前面
//        如果有报错的代码,return false将起不到作用;  2,通过事件对象--e.preventDefault()

$(function(){
    
//功能一
//验证要求: (1) 用户名不能为空, 长度为2-6位
//          (2) 密码不能为空, 长度为6-12位

//1,先找到表单
$('#form').bootstrapValidator({
  
    //2,配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
  
    //3,指定校验字段--配置提示信息
    fields: {

      //校验用户名，对应name表单的name属性--要与后台一致
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
          //正则校验
          regexp: {
            regexp: /^[a-zA-Z0-9_\.]+$/,
            message: '用户名由数字字母下划线和.组成'
          },
          //callback专门用来配置回调提示消息
          callback:{
              message:'用户名不存在'
          }
        }
      },

      //同理配置password
      password: {
          validators: {
              notEmpty: {
                  message:'密码不能为空'
              },
              stringLength: {
                  min:6,
                  max:12,
                  message:'密码长度为6-12位'
              },
              callback:{
                  message:'密码错误'
              }
          }
      }
    }
  
  })



//功能二
//  阻止submit的默认跳转,利用ajax发送请求

//bootstrapValidator表单校验成功事件---使用文档
$("#form").on('success.form.bv', function (e) {
    //1,阻止默认的提交
    e.preventDefault();
    //2,使用ajax提交逻辑
    $.ajax({
        type:'post',
        url:'/employee/employeeLogin',
        data:$('#form').serialize(),
        //jqeruy中的方法,可以将表单中有name属性的表单项的键和值拼接成键值对的字符
        //串(不能获取文件数据),可直接用于数据传输
        dataType:'json',
        success:function(info){
            console.log(info)
            if(info.error == 1000){
                // alert('用户名错误')
                //先获取实例,再调用实例的方法
                $("#form").data('bootstrapValidator').updateStatus('username','INVALID','callback')
            }
            if(info.error == 1001){
                // alert('密码错误')
                $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback')
            }
            if(info.success){
                //登录成功,跳转首页
                location.href = 'index.html'
            }
        }
    })
  
})
//功能三,登录验证--更改提示信息的方式---bootstrapValidator插件,更改功能二里的alert弹出信息的方式即可
//1,实现重置表单--重置input内容和校验状态(即同步后面的符号)
//  重置表单--见bootstrapValidator插件中的重置表单方法
// $(form).data('bootstrapValidator').resetForm()
//      $(form).data('bootstrapValidator')表示获取实例,  然后调用.resetForm()方法,该方法有2个参数,true/false
//      true表示重置状态和内容; false表示只重置状态

$('[type="reset"]').on('click',function(){
    //reset按钮本身就具备重置内容的功能,所以这里只重置状态即可
    $('#form').data('bootstrapValidator').resetForm(false);
})

//2,校验失败,更改显示提示信息---在ajax的成功回调函数里设置
//  调用插件实例方法,更新username字段状态成失败,添加提示信息
// updateStatus(field, status, validator) 有3个参数
// field,需要更新的字段名字
// status,需要更新成的状态 VALID成功  INVALID失败 
// validator,配置校验规则,将来会配置的规则的message进行提示

//3,校验成功,跳转页面--跳到首页

});
