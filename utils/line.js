import { Line, mixins} from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  height:'300px',
  mixins: [reactiveProp],
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
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart(this.chartData, this.options)
  }
}