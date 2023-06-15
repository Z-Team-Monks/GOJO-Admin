<template>
    <div class="chart-card pa-2">
        <h3 class="text-center mt-8" v-if="chartData.labels.length > 0">Transaction Report</h3>
      <BarChart
       
        :chartData="chartData"
        :options="options"
        :height="210"
      />      
    </div>
  </template>
  
  <script>
  import BarChart from "../../utils/bar";
  export default {
    props: {
      chartData: {
        type: Object,
        default: null,
      },
      options: {
        type: Object,
        default: null,
      },
    },
    components: {
      BarChart,
    },
  
    data() {
      return {};
    },
  };
  </script>
  
  <style>
 
  </style>
  