<template>
  <div v-html="getKatexOutput" :class="{ 'bg-gray-200': pre, 'p-4': true }" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import katex from 'katex';

@Component({
  name: 'katex',
})
export default class App extends Vue {
  output = ''

  @Prop(String) readonly equation: string
  @Prop({ type: Boolean, default: false }) readonly pre: Boolean

  get getKatexOutput () {
    return katex.renderToString(this.equation, {
      throwOnError: true,
      // @ts-ignore
      output: 'mathml'
    });
  }
}
</script>