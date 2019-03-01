
//区域滚动功能

mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 ,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    scrollY: true, //是否竖向滚动
    indicators: false, //是否显示滚动条
    deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
    bounce: true //是否启用回弹
});


// 地址栏拼接数据 --->封装函数

//知识点: 
//       1,页面与页面之间共享数据的2种方法:(1)localStorage(2)通过地址栏拼接,在另一个页面再获取地址栏上拼接的数据
//       2,获取地址栏数据的2种方法:(1)location.href;获取完整地址栏地址
//                               (2)location.search;获取到从?开始到最后拼接的数据字符串,但是如果有中文需要解码
//       3,解码方法:decodeURI(location.search)
//       4,如果地址栏只拼接了一个键值对的数据,利用操作字符串的方法截取出来即可
//         但是,如果地址栏拼接了多组数据,-->利用操作字符串方法-->转换成数组-->再转换成对象,方便使用



    function getSearch( k ){  //设置形参: 如果有多组数据,传个键作为参进来,直接获取对应的值
        
        //1,回到搜索页面,在地址栏后拼接上需要的数据--搜索关键字

        //2,获取地址栏的搜索关键字
        var str = location.search;
        //3,解码
        str = decodeURI(str);  //结果?value=新百伦&name=rr&age=20
        console.log(str);

        //4,去掉?
        str = str.slice(1); //字符串value=阿迪&name=rr&age=20
        console.log(str);

        //5,去掉&,并转换成数组
        var arr = str.split('&'); //数组["value=阿迪", "name=rr", "age=20"]
        console.log(arr);

        var obj = {};

        //6,遍历数组,给每一项去掉=,转换成对象
        arr.forEach(function(ele,index){
            //截取=,并拿到键
            var key = ele.split('=')[0]
            console.log(key)
            //拿到键对应的值
            var value = ele.split('=')[1];
            //添加到对象中去
            obj[key] = value ; //对象{value: "阿迪", name: "rr", age: "20"}
        })

        console.log(obj)

        return obj[k]; //调用这个方法,直接返回对应的值
    }