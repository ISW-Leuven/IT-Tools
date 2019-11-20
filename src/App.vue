<template>
  <div id="app" class="h-full">
    <div class="flex h-full">
      <navigation />

      <main class="w-full">
        <div class="container mx-auto">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import navigation from '@/components/Navigation.vue';

@Component({
  components: {
    navigation,
  },
})
export default class App extends Vue {}
</script>
