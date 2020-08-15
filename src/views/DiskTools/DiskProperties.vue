<template>
  <el-row :gutter="25">
    <el-col :span="24" tag="section">
      <h1>Calculating the properties of a disk (Edublend excersises)</h1>
    </el-col>

    <!-- Form -->
    <el-col tag="section" :xs="24" :md="8">
      <el-form class="w-full max-w-sm" label-position="'top'" @submit.native.prevent="calculate">
        <h2 class="text-xl mb-4">Question</h2>

        <el-form-item label="Speed">
          <el-input type="number" min="1" v-model="speed" required />
        </el-form-item>
        <el-form-item label="Sectors">
          <el-input type="number" min="1" v-model="sectors" required />
        </el-form-item>
        <el-form-item label="Sector size (bytes)">
          <el-input type="number" min="1" v-model="sectorSize" required />
        </el-form-item>
        <el-form-item label="">
          <el-button native-type="submit">Calculate</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!-- Solution -->
    <el-col tag="aside" :xs="24" :md="16" v-loading="loading">
      <h2 class="text-xl mb-4 font-bold">Solution</h2>
      <div v-if="show">
        <pre v-for="(solution, key) in solutions" :key="key" v-html="solution"></pre>
      </div>
      <el-alert v-else :closable="false">Please enter the info and press calculate.</el-alert>
    </el-col>

    <!-- How to calculate -->
    <el-col :span="24" tag="section">
      <h2 class="text-xl mb-3 font-bold">How to calculate?</h2>
      <h3 class="text-lg mb-1">Rotational wait time</h3>
      <p>
        This is the time it takes for half of a rotation to complete. First you will the rotates per second.
        Divide the disk speed (RPM) by 60 to get rotations per second:
      </p>
      <katex equation="RPS = {Rotates\space Per\space Minute \over 60}" :pre="true" class="mt-2" />
    </el-col>
  </el-row>
</template>

<script>
import katexComponent from '@/components/others/katex.vue';
import katex from 'katex';

export default {
  name: 'disk-tools-disk-properties',
  components: {
    katex: katexComponent
  },
  data () {
    return {
      speed: 15000,
      sectors: 34,
      sectorSize: 4096,
      solutions: {
        timeForOneRotation: '',
        rotationalWaitTime: '',
        sectorReadTime: '',
        speed: '',
      },
      loading: false,
      show: false,
    }
  },
  methods:{
    calculate () {
      this.loading = true;

      /**
       * Calculate time for one rotation
       */
      let timeForOneRotation = ((1/(this.speed / 60))*1000).toFixed(2);
      let string = String.raw`a = {1 \over {${this.speed} \over 60}} \times 1000 = ${timeForOneRotation}\space [ms]`;
      this.solutions['timeForOneRotation'] = katex.renderToString(string, {
        throwOnError: true,
        output: 'mathml'
      });

      /**
       * Calculate rotational wait time
       */
      const rotationalWaitTime = (timeForOneRotation / 2);
      string = String.raw`Rotational\space wait\space time = {${timeForOneRotation} \over 2} = ${rotationalWaitTime}\space [ms]`;
      this.solutions.rotationalWaitTime = katex.renderToString(string, {
        throwOnError: true,
        output: 'mathml'
      });

      /**
       * Calculate sector read time
       */
      const sectorReadTime = (timeForOneRotation / this.sectors).toFixed(2);
      string = String.raw`Sector\space read\space time = {${timeForOneRotation} \over ${this.sectors} } = ${sectorReadTime}\space [ms]`;
      this.solutions.sectorReadTime = katex.renderToString(string, {
        throwOnError: true,
        output: 'mathml'
      });

      /**
       * Calculate speed
       */
      const speed = Math.round(((this.sectors * this.sectorSize) * (this.speed / 60))/1024/1024);
      string = String.raw`Speed = {(${this.sectors} \times ${this.sectorSize}) \times (${this.speed} \div 60) \over 1024 \times 1024} = ${speed}\space [{MB \over s}]`;
      this.solutions.speed = katex.renderToString(string, {
        throwOnError: true,
        output: 'mathml'
      });

      this.show = true;
      this.loading = false;
    }
  }
}
</script>