<template>
  <div>
    <v-chart :options="chartOptions" autoresize />
  </div>
</template>

<script>
import ECharts from 'vue-echarts';
import 'echarts-liquidfill';


export default {
  components: {
    'v-chart': ECharts,
  },
  data() {
    return {
      chartOptions: {},
    };
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    data: {
      handler(newVal) {
        this.updateChart(newVal);
      },
      immediate: true,
    },
  },
    mounted() {
    setTimeout(()=>{
        this.updateChart();

    },800)
    
  },
  methods: {
    updateChart(data) {
      this.chartOptions = {
        series: [
          {
            type: 'liquidFill',
            data: data,
            // 其他配置选项，具体请参考 ECharts 官方文档
          },
        ],
      };
    },
  },
};
</script>
