<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div id="main" style="height:500px;padding:5px"></div>
      </el-col>
      <el-col :span="12">
        <div id="mainTow" style="height:500px;padding:5px"></div>
      </el-col>
    </el-row> 
  </div>
</template>

<script>
export default {
  name: '',
  data() { 
    return {

    }
  },
  mounted() {
    console.log('1')
    this.main()
    this.main2()
  },
  methods:{
    //第一幅图表
    main(){
      //初始化echarts的实例
      var main = this.$echarts.init(document.getElementById("main"));
      //绘制图表
      main.setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      })
    },
    //第二幅图表
    main2(){
      //初始化echarts的实例
      var main = this.$echarts.init(document.getElementById("mainTow"));
      //绘制图表
      main.setOption({
          legend: {
            top: 'bottom'
          },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          series: [
            {
              name: 'Nightingale Chart',
              type: 'pie',
              radius: [50, 250],
              center: ['50%', '50%'],
              roseType: 'area',
              itemStyle: {
                borderRadius: 8
              },
              data: [
                { value: 42, name: '张三' },
                { value: 38, name: 'rose 2' },
                { value: 32, name: 'rose 3' },
                { value: 30, name: 'rose 4' },
                { value: 28, name: 'rose 5' },
                { value: 26, name: 'rose 6' },
                { value: 22, name: 'rose 7' },
                { value: 18, name: 'rose 8' }
              ]
            }
          ]
      })
    }
  },
 }
</script>

<style scoped>

</style>