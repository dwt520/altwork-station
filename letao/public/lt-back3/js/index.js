$(function(){
    var echarts_left = echarts.init(document.querySelector('.echarts_left'));

        // 指定图表的配置项和数据
        var option1 = {
            title: {
                text: '2018年注册人数'
            },
            tooltip: {},
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
                data: [500, 1200, 360, 1000, 810, 520]
            },
            {
                name: '销量',
                type: 'bar',
                data: [580, 520, 360, 910, 610, 820]
            }],
        };

        // 使用刚指定的配置项和数据显示图表。
        echarts_left.setOption(option1);



        var echarts_right = echarts.init(document.querySelector('.echarts_right'));

        var option2= {
            title : {
                text: '热门品牌销售',
                textStyle:{
                    color:'red',
                    fontSize:'26'
                },
                subtext: '2018年11月',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['阿迪','耐克','彪马','李宁','回力','牛逼']
            },
            series : [
                {
                    name: '品牌鞋',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'阿迪'},
                        {value:310, name:'耐克'},
                        {value:234, name:'彪马'},
                        {value:135, name:'李宁'},
                        {value:1548, name:'回力'},
                        {value:999, name:'牛逼'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            // shadowColor: 'rgba(0, 0, 0, 0.5)'
                            shadowColor:'yellow'
                        }
                    }
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        echarts_right.setOption(option2);
})