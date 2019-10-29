<template>
  <section>
    <prismic-rich-text :field="title" />
    <line-chart :type="'line'" :data="data" :width="300" :height="110" />
  </section>
</template>

<script>
import LineChart from '~/components/line-chart'

export default {
  name: 'ChartSection',
  components: {
    LineChart
  },
  props: {
    title: {
      type: Array,
      default: null
    },
    data: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped></style>
