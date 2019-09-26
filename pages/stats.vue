<template>
  <main class="page stats-page">
    <header class="page-header">
      <div class="container md padding-container">
        <prismic-rich-text class="page-header__title" :field="document.title" />
      </div>
    </header>
    <main class="page-body">
      <div class="container md padding-container">
        <chart-section
          v-for="(chart, index) in chartsData"
          :key="`chart-${index}`"
          :title="document[chart.key]"
          :data="chart.data"
        />
      </div>
    </main>
  </main>
</template>

<script>
import ChartSection from '../components/chart-section'
import DocumentFetcher from '~/services/document-fetcher'

export default {
  name: 'Stats',
  nuxtI18n: {
    paths: {
      'fr-fr': '/stats',
      'en-gb': '/stats'
    }
  },
  components: {
    ChartSection
  },
  async asyncData({ app, error, $moment }) {
    function createData({ key, color }) {
      return {
        key,
        data: {
          labels: null,
          datasets: [
            {
              label: app.i18n.t(`stats-legend-label-${key}`),
              data: [],
              type: 'line',
              backgroundColor: backgroundColorFrom(color),
              borderColor: color
            }
          ]
        }
      }
    }
    function backgroundColorFrom(rgb) {
      const rgba = rgb.replace(/rgb/i, 'rgba')
      return rgba.replace(/\)/i, ',0.2)')
    }

    try {
      const datasets = [
        { key: 'accounts', color: 'rgb(54, 162, 235)' },
        { key: 'campaigns', color: 'rgb(255, 205, 86)' },
        { key: 'certifications', color: 'rgb(75, 192, 192)' },
        { key: 'organizations', color: 'rgb(153, 102, 255)' }
      ]

      const chartsData = datasets.map((dataset) => createData(dataset))
      const dates = []

      const { data } = await DocumentFetcher(app.i18n).getStats()
      data.stats.forEach((stats) => {
        dates.push($moment(stats.primary.date).format('MM/YY'))
        chartsData[0].data.datasets[0].data.push(stats.primary.accounts)
        chartsData[1].data.datasets[0].data.push(stats.primary.campaigns)
        chartsData[2].data.datasets[0].data.push(stats.primary.certifications)
        chartsData[3].data.datasets[0].data.push(stats.primary.organizations)
      })

      chartsData.forEach((chartData) => (chartData.data.labels = dates))

      return {
        document: data,
        chartsData
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  }
}
</script>

<style lang="scss">
.stats-page {
  section {
    margin-bottom: 60px;
  }
  h1,
  h2 {
    font-family: 'Open Sans', Arial, sans-serif;
    font-weight: 400;
  }
  h1 {
    font-size: 44px;
  }
  h2 {
    font-size: 24px;
    margin-top: 30px;
    margin-bottom: 15px;
  }

  .blue {
    font-weight: bold;
    color: $blue-1;
  }

  canvas {
    margin: 40px 0;
  }
}
</style>
