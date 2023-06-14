<template>
    <div class="chart-card pa-2">
        <h3 class="text-center mt-8" v-if="chartData.labels.length > 0">Transaction History</h3>
      <LineC v-if="chartData.labels.length > 0" :chartData="chartData" :options="options" :height="210"  />
      
      
    </div>
  </template>
  
  <script>
  import LineC from '../../utils/line'
  export default {
    props: {
      chartData: {
        type: Object,
        default: null
      },
      options: {
        type: Object,
        default: null
      }
    },
    components: {
      LineC
    },
  
  
    data() {
      return {
  
  
      }
    },
  
  
  }
  </script>
  
  <style>
  .chart-card {
    border-radius: 4%;
    padding: .5rem;
    background-color: white;
    border: 2px #1BB55C solid;
   
  }
  </style>