$(function(){
   
//柱状图
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector('.lt_bar'));

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '2019注册人数',
            textStyle: {
                fontSize:20
            }
        },
        tooltip: {a:9},
        //图例,一定要和数据项series的name一一对应
        legend: {
            data:['人数','销量']
        },
        xAxis: {
            data: ["1月","2月","3月","4月","5月","6月"]
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: [55, 260, 36, 100, 510, 220]
        },
        {
            name: '销量',
            type: 'bar',
            data: [555, 240, 366, 1050, 140, 720]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

//饼图
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector('.lt_pie'));

    // 指定图表的配置项和数据
    var option = {
        backgroundColor: '#2c343c',
    
        title: {
            text: '热门品牌销售',
            left: 'center',
            top: 20,
            textStyle: {
                color: '#ccc',
                fontSize:30
            }
        },
    
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
    
        visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series : [
            {
                name:'销量',
                type:'pie',
                radius : '55%',
                center: ['50%', '50%'],
                data:[
                    {value:335, name:'阿迪'},
                    {value:310, name:'耐克'},
                    {value:274, name:'特步'},
                    {value:235, name:'老北京'},
                    {value:400, name:'加力'}
                ].sort(function (a, b) { return a.value - b.value; }),
                roseType: 'radius',
                label: {
                    normal: {
                        textStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#c23531',
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
    
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
})