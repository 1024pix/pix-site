<script>
import { Line } from 'vue-chartjs'

export default {
  name: 'LineChart',
  extends: Line,
  props: {
    data: {
      type: Object,
      default: null
    },
    legendPosition: {
      type: String,
      default: 'bottom'
    }
  },
  mounted() {
    this.renderChart(this.data, {
      scales: {
        yAxes: [
          {
            ticks: { beginAtZero: false }
          }
        ]
      }
    })
  }
}
</script>

<style scoped lang="scss"></style>
