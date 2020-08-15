<template>
  <pre v-html="getKatexOutput" />
</template>

<script>
import katex from 'katex';

export default {
  name: 'components-others-katex',
  props: {
    equation: {
      type: String,
      readonly: true,
      required: true,
    }
  },
  computed: {
    getKatexOutput () {
      return katex.renderToString(this.equation, {
        throwOnError: true,
        output: 'mathml'
      });
    }
  }
}
</script>