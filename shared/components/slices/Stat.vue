<template>
  <div :id="`slice-${indexForId}`" class="stat">
    <prismic-rich-text :field="content.block_title" />
    <prismic-rich-text
      :field="content.block_presentation"
      :serializer="customPrismicRichTextSerializer"
    />
    <chart-section :data="chartData" />
  </div>
</template>

<script>
import metabaseFetcher from "@shared/services/metabase-fetcher";

export default {
  name: "SlicesStatSlice",
  props: {
    slice: {
      type: Object,
      default: null,
    },
    indexForId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      values: [],
      labels: [],
    };
  },
  async fetch() {
    const metabase = await metabaseFetcher();
    const { values, labels } = await metabase.getCard({
      cardId: this.content.metabase_card_id,
      xAxisLabel: this.content.metabase_x_axis_label,
      yAxisLabel: this.content.metabase_y_axis_label,
    });
    this.values = values;
    this.labels = labels;
  },
  setup() {
    const { customPrismicRichTextSerializer } = usePrismicRichTextSerializer();
    return { customPrismicRichTextSerializer };
  },
  computed: {
    content() {
      return this.slice.primary;
    },
    data() {
      return this.slice.items;
    },
    chartData() {
      function backgroundColorFrom(color) {
        const hex = color.replace("#", "");
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        return "rgba(" + r + "," + g + "," + b + ",0.2)";
      }

      const valueData = this.values;
      const labelData = this.labels;

      return {
        datasets: [
          {
            backgroundColor: backgroundColorFrom(
              this.content.block_graph_color
            ),
            borderColor: this.content.block_graph_color,
            data: valueData,
            label: this.content.block_data_name[0].text,
            type: "line",
          },
        ],
        labels: labelData,
      };
    },
  },
};
</script>

<style lang="scss">
.stat {
  text-align: center;
  max-width: 1140px;
  margin: 0 50px;

  @include device-is("desktop") {
    margin: 0 auto;
  }

  canvas {
    margin: 40px 0;
  }
}
</style>
