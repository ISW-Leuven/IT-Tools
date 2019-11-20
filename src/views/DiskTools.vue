<template>
  <div class="max-w-100 mt-4 px-6 py-4 rounded overflow-hidden shadow-lg bg-white">
    <h1 class="text-3xl mb-4">Disk Tools</h1>

    <nav class="flex flex-col sm:flex-row bg-gray-200 -mx-6 mb-4 px-6">
        <router-link
          :to="{ name: 'disk-tools' }" v-slot="{ href, route, navigate, isActive, isExactActive }">
            <a :href="href" @click="navigate" :class="{
              'text-gray-600 py-4 px-6 block hover:text-indigo-500 focus:outline-none': true,
              'text-indigo-500 border-b-2 font-medium border-indigo-500': isExactActive
            }">
              Disk Properties
            </a>
        </router-link>
        <router-link
          :to="{ name: 'disk-tools-busses' }" v-slot="{ href, route, navigate, isActive, isExactActive }">
            <a :href="href" @click="navigate" :class="{
              'text-gray-600 py-4 px-6 block hover:text-indigo-500 focus:outline-none': true,
              'text-indigo-500 border-b-2 font-medium border-indigo-500': isExactActive
            }">
              Busses
            </a>
        </router-link>
    </nav>

    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'Disk-Tools'
})

export default class App extends Vue {}
</script>
