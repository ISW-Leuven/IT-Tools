<template>
  <el-col tag="section" :xs="24" :sm="12" :md="8">
    <h2>Network Tools</h2>
    <ul>
      <li>
        <router-link :to="{ name: 'networktools-vlsm' }">VLSM Calculator</router-link>
      </li>
    </ul>
  </el-col>
</template>

<script>
export default {
  name: 'components-list-network-list',
}
</script>