<template>
  <div class="home">
    <h1>A list of handy tools for IT.</h1>
    <ul>
      <li><router-link :to="{ name: 'networktools-vlsm' }">VLSM Calculator</router-link></li>
    </ul>
    <p>
      Please note this website is very early in development. Styling is not yet done (sorry).
    </p>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>
