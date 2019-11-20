<template>
  <div class="flex">
    <div class="w-full max-w-sm">
      <h2 class="text-xl mb-4">Question</h2>
      <div class="-mx-3 mb-4">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="speed">
            Speed (RPM)
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" id="speed" type="number" v-model="speed"
            min="1"
          >
        </div>
      </div>
      <div class="-mx-3 mb-4">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="sectors">
            Sectors
          </label>
          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" id="sectors" type="number" v-model="sectors" min="1">
        </div>
      </div>
      <div class="-mx-3 mb-4">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="sector-size">
            Sector Size (bytes)
          </label>
          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" id="sector-size" type="number" v-model="sectorSize" min="1">
        </div>
      </div>
      <div class="-mx-3 mb-4">
        <div class="w-full px-3 text-right">
          <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            @click="calculate" type="button">
            Calculate
          </button>
        </div>
      </div>
    </div>
    <div class="ml-6 w-full">
      <h2 class="text-xl mb-4">Solution</h2>

      <pre v-for="(solution, key) in solutions" :key="key" v-html="solution" class="bg-gray-200 p-4 w-full"></pre>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import katex from 'katex';

@Component({
  name: 'disk-properties',
})

export default class App extends Vue {
  speed = 15000
  sectors = 34
  sectorSize = 4096
  solutions = {
    timeForOneRotation: '',
    rotationalWaitTime: '',
    sectorReadTime: '',
    speed: '',
  }

  calculate () {
    /**
     * Calculate time for one rotation
     */
    let timeForOneRotation: any = ((1/(this.speed / 60))*1000).toFixed(2);
    let string = String.raw`a = {1 \over {${this.speed} \over 60}} \times 1000 = ${timeForOneRotation}\space [ms]`;
    this.solutions.timeForOneRotation = katex.renderToString(string, {
      throwOnError: true,
      // @ts-ignore
      output: 'mathml'
    });

    /**
     * Calculate rotational wait time
     */
    const rotationalWaitTime = (timeForOneRotation / 2);
    string = String.raw`Rotational\space wait\space time = {${timeForOneRotation} \over 2} = ${rotationalWaitTime}\space [ms]`;
    this.solutions.rotationalWaitTime = katex.renderToString(string, {
      throwOnError: true,
      // @ts-ignore
      output: 'mathml'
    });

    /**
     * Calculate sector read time
     */
    const sectorReadTime = (timeForOneRotation / this.sectors).toFixed(2);
    string = String.raw`Sector\space read\space time = {${timeForOneRotation} \over ${this.sectors} } = ${sectorReadTime}\space [ms]`;
    this.solutions.sectorReadTime = katex.renderToString(string, {
      throwOnError: true,
      // @ts-ignore
      output: 'mathml'
    });

    /**
     * Calculate speed
     */
    const speed = Math.round(((this.sectors * this.sectorSize) * (this.speed / 60))/1024/1024);
    string = String.raw`Speed = {(${this.sectors} \times ${this.sectorSize}) \times ${this.speed} \div 60) \over 1024 \times 1024} = ${speed}\space MB/s`;
    this.solutions.speed = katex.renderToString(string, {
      throwOnError: true,
      // @ts-ignore
      output: 'mathml'
    });
  }
}
</script>
