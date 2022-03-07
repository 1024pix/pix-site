<script>
import { Line } from 'vue-chartjs'

export default {
  name: 'LineChart',
  extends: Line,
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  mounted() {
    this.renderChart(this.data, {
      legend: {
        position: 'bottom',
        onClick: () => {},
      },
      scales: {
        yAxes: [
          {
            ticks: { beginAtZero: true },
          },
        ],
      },
    })
  },
}
</script>

<style scoped lang="scss"></style>
