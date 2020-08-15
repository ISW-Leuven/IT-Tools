<template>
  <div class="home">
    <h1>A list of handy tools for IT.</h1>
    <el-row :gutter="25" id="section-lists">
      <network-list />
      <disk-list />
    </el-row>
    <p>
      Please note this website is very early in development. Styling is not yet done (sorry).
    </p>
  </div>
</template>

<script>
import networkList from '@/components/lists/NetworkList.vue';
import diskList from '@/components/lists/DiskList.vue';

export default {
  name: 'Home',
  components: {
    networkList,
    diskList,
  }
}
</script>