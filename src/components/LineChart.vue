<template>
  <canvas id="canvas" width="800" height="600"> </canvas>
</template>
<script>
import { Line } from "vue-chartjs";
import { Chart, registerables } from "chart.js";
export default {
  name: "LineChart",
  data() {
    return {
      interval: null,
      ctx: null,
      canvas: null,
      chart: null,
      config: {},
    };
  },
  props: {
    chartData: {
      type: Array,
      default: null,
    },
  },
  methods: {
    showData() {
      this.renderChart(this.chartData, this.options);
    },
    normolizeValues() {
      const min = Math.min(...this.chartData);
      const max = Math.max(...this.chartData);

      const result = [];
      this.chartData.forEach((item) => {
        // result.push(5 + (item - min) * 95) / (max + 1 - min);
        result.push((item / 1000).toFixed(5));
      });
      console.log(result);
      return result;
    },
    registerConfig() {
      this.config = {
        type: "line",
        data: {
          labels: this.chartData,
          datasets: [
            {
              label: "",
              data: this.normolizeValues(),
              backgroundColor: "#f0f0f0",
            },
          ],
        },
        options: {
          responsive: false,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              displayColors: false,
            },
          },
          scales: {
            x: {
              display: false, // Hide X axis labels
            },
          },
        },
      };
    },
  },
  mounted() {
    Chart.register(...registerables);
    this.registerConfig();
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.chart = new Chart(this.canvas, this.config);
  },
  unmounted() {
    // this.ctx = clearRect(0, 0, this.canvas.width, this.canvas.heigth);
    // this.chart.destroy();
  },
  watch: {
    chartData: {
      handler: function () {
        console.log("Im here");
        this.registerConfig();
        this.chart.destroy();
        this.chart = new Chart(this.canvas, this.config);
      },
      deep: true,
    },
  },
};
</script>
