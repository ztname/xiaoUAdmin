<template>
    <div id="app">
        <div id="main" ref="main" style="width: 600px;height:400px;"></div>
    </div>
</template>

<script>
// 下载echarts之后，第一步引入
import echarts from "echarts"
export default {
    mounted(){
        // 第二步：通过echarts.init实例化
        var myChart = echarts.init(this.$refs.main);

        // option用于盛放数据,关于数据的各种样式设置可在左上角的配置项进行参考设置
            var option = {
                //title： 标题
            title: {
                text: 'ECharts 入门示例',
                textStyle:{
                    fontSize:30,
                    fontStyle:"italic"
                }
            },
            // 提示文本
            tooltip: {
                triggerOn:"click"
            },
            // 图例
            legend: {
                data:['销量',"价格"]
            },
            // x轴数据
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            // y轴数据，为空时系统默认在纵轴取series中data的最大值作为最大刻度
            yAxis: {},
            // 用于盛放数据值，一个对象的name对应一个图例数据
            series: [{
                name: '销量',
                type: 'line',
                data: [5, 20, 36, 10, 10, 20]
            },{
                name:"价格",
                type:"pie",
                data:[20,30,70,100,150]
            }]
        };

        // 第三步：通过 实例的setOption 方法对option中的数据生成一个简单的柱状图
         myChart.setOption(option);
    }
};
</script>

<style>
</style>
