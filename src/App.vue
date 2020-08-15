<template>
  <div id="app">
    <el-menu class="el-menu-demo" mode="horizontal" :router="true">
      <el-menu-item :index="{ name: 'Home' }">Home</el-menu-item>
      <el-menu-item :index="{ name: 'networktools-vlsm' }">VLSM</el-menu-item>
    </el-menu>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>