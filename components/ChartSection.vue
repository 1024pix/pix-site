<template>
  <section>
    <line-chart :type="'line'" :data="data" :width="300" :height="110" />
  </section>
</template>

<script>
import LineChart from '@/components/LineChart'

export default {
  name: 'ChartSection',
  components: {
    LineChart,
  },
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style scoped></style>
