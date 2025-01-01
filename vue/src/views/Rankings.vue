<!--
  @author: <Applepie>
  @date: 2025/1/1
  @description: 排行榜报表组件
-->

<template>
    <div class="rankings">
      <h2>销量前十的书籍</h2>
      <div ref="chart" style="width: 100%; height: 600px;"></div>
    </div>
</template>
  
<script>
  import request from "@/utils/request";
  import * as echarts from 'echarts';
  
  export default {
    name: "Rankings",
    data() {
      return {
        books: [],
      };
    },
    mounted() {
      this.fetchTop10Books();
    },
    methods: {
      fetchTop10Books() {
        request.get('/books/top-books')
          .then(response => {
            this.books = response.data; // 获取到销量前十的书籍数据
            console.log('Fetched Top 10 Books:', this.books);
            this.initChart();
          })
          .catch(error => {
            console.error('Error fetching top 10 books:', error);
          });
      },
      initChart() {
        const chartDom = this.$refs.chart;
        const myChart = echarts.init(chartDom);
  
        const option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: this.books.map(book => book.bname)
          },
          series: [
            {
              name: '销量',
              type: 'bar',
              data: this.books.map(book => book.sales),
              itemStyle: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 1, 0,
                  [
                    { offset: 0, color: '#83bff6' },
                    { offset: 0.5, color: '#188df0' },
                    { offset: 1, color: '#188df0' }
                  ]
                )
              },
              label: {
                show: true,
                position: 'right',
                formatter: '{c} 本'
              }
            }
          ]
        };
  
        option && myChart.setOption(option);
      }
    }
  };
</script>
  
<style scoped>
  .rankings {
    padding: 20px;
  }
  
  .rankings h2 {
    text-align: center;
    margin-bottom: 20px;
  }
</style>
  
  
  
  
  