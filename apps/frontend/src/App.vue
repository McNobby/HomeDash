

<template>
  <AnimatedBackground>
    <router-view></router-view>
  </AnimatedBackground>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AnimatedBackground from './components/AnimatedBackground/AnimatedBackground.vue';

export default defineComponent( {
  components: {
    AnimatedBackground
  }
})
</script>