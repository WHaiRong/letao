
$(function(){
    

    //本地存储: localStorage---基于键值对
    // localStorage.setItem('key','val');  存储
    // localStorage.getItem('key');  获取
    // localStorage.removeItem('key');  删除单个
    // localStorage.clear(); 删除所有[删除本机的所以缓存]
    //注意:  localStorage只能存储字符串类型的数据!!
    //存储复杂数据: 先将复杂数据通过操作json转换,再进行localStorage操作
    //(1)存储: 
    //       先将复杂数据类型,转成json字符串, --->JSON.stringify(obj/arr);
    //       再利用localStorage.setItem('key',jsonstr);存储到本地
    //(2)获取:
    //       利用localStorage.getItem('key');获取到数据,获取到的是json字符串
    //       将获取到的jsonstr转换成复杂数据类型,使用JSON.parse(jsonstr),


// 分析:存储数据可以用对象或数组,对象是无序的,数组是有序的;这里用数组存储数数组,方便后面找数据的操作    
// 准备的假数据:  可先在控制台操作,往本地存储数据,
// var arr = ['山河远阔','消愁','1200块钱','如果会是你']
// var jsonstr = JSON.stringify(arr);
// localStorage.setItem('search_list',jsonstr);

    // 分析功能:
    // 功能1: 历史记录渲染功能
    // 功能2: 清空全部的历史记录
    // 功能3: 删除单个历史记录
    // 功能4: 添加单个历史记录

    //功能一:历史记录渲染功能

    // 约定localStorage(key,value);key键名为search_list

    //1,从本地缓存中获取数据,动态渲染历史记录
    //思路: 
    //  1>,获取本地存储的数据-->获取到的结果是json字符串,要转换成数组
    //  2>,利用模板引擎,渲染数据


    render();


    //获取数据-->封装函数,方便后面复用
    function getData(){
        var jsonstr = localStorage.getItem('search_list') || '[]'
        // console.log(jsonstr);
        //转换成数组,当没有数据时,jsonstr为null,即下面的arr为null,模板会报错-->给arr加个默认值
        var arr = JSON.parse(jsonstr);
        // console.log(arr);
        return arr;
    }
    // console.log(getData())

    //遍历数组,渲染数据-->封装函数,方便后面复用
    function render(){
        //要先获取数据
        var arr = getData();
//注意: 调用需要拿到数据的函数,如果函数里没写return,返回this指向的对象,没有this,返回undefind;
//      所以要在getData这个函数里写上return,否则拿不到想获取的数据arr
        var htmlstr = template('searchTpl',{arr:arr})
        $('.history').html(htmlstr);
    }



    // 功能二:清空全部的历史记录---添加模态框弹出提示消息--->mui中消息框组件
    // 注意: localStorage.clear();是删除所有的本地缓存,即也会删除别的数据,所以这里删除记录不能用,要用remove
    $('.history').on('click','.clearBtn',function(){

        //消息提示框
        mui.confirm('你确认要清空历史记录吗','温馨提示',['取消','确认'],function(e){
            //通过e.index确定用户选择的是取消还是确认按钮的下标
            if(e.index === 1){

                //1,删除本地缓存的数据
                localStorage.removeItem('search_list');
                //2,要重新渲染ul,--->前面渲染数据的代码可以封装成函数,方便这里调用
                render();
            }
        })
    })



    // 功能3: 删除单个历史记录
    // 思路:
    // 思考:要删除当前点击这条数据,怎么找到对应的数据?
    //      历史数据是存在数组里,所以可以通过下标找,-->自定义属性,在标签上存储下标
    // 1>,获取本地存储的数据,转换成数组
    // 2>,获取下标,删除数组里对应的数据
    // 3>,往本地存入删除数据后的新的数组
    // 4>,重新渲染
    $('.history').on('click','.btn_delete',function(){
        //获取下标
        var index = $(this).data('index');
        console.log(index);
        //获取存储本地数据的数组
        var arr = getData();
        console.log(arr);
        //删除数组里当前对应下标的数据
        arr.splice(index,1);
        console.log(arr);
        //将修改后的数据存入本地
        localStorage.setItem('search_list',JSON.stringify(arr));
        //重新渲染数据
        render();
    })


    //功能4,添加单个历史记录
    //思路:
    //  1>,给搜索按钮添加点击事件
    //  2>,点击事件里,获取搜索框内容
    //  3>,把input的值赋值给存储本地数据的数组,并且是添加到数组最前面
    //  4>,重新渲染数据
    $('.search_btn').on('click',function(){
        //1获取搜索框内容
        var value = $('.search_input').val().trim();
        console.log(value);
        if(value === ''){
            //mui提示框 
            mui.toast('请输入搜索关键字');
            return;
        }
        //2获取数组
        var arr = getData();

        //7,数组去重
        if(arr.indexOf(value) != -1){
            //如果value在数组中已经存在,返回value在数组中的下标;如果不存在返回-1
            arr.splice(arr.indexOf(value),1);
        }

        //8,一般历史记录不用存过多,这里假设只存10条,多余的,从数组最后面开始删掉
        if(arr.length >= 10){
            arr.pop();
        }

        arr.unshift(value);
        //3存储到本地search_list数组
        localStorage.setItem('search_list',JSON.stringify(arr));
        //4,重新渲染数据
        render();
        //5,清空搜索框
        $('.search_input').val('');
        //6,如果搜索历史中已经有当前要搜索的记录,删除后面的,在最前面重新添加历史记录
        //  那么input的值存入数组时就要判断,数组中是否已经存在当前的value值

        //点击搜索跳转到搜索列表页
        location.href = 'searchlist.html?value=' + value;
    })


    //点击历史记录,搜索商品
    $('.history').on('click','.record li',function(){
        console.log(11)
        
    })

});