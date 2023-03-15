<template>
    <div class="animated-background">
        <DotEntity v-for="i in maxEntities" 
        :key="i"
        :id="i" 
        :size="Math.random() * 10" 
        color="#FFF" />
    </div>
    <slot class="homeDash-content" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DotEntity from './DotEntity.vue';


export default defineComponent({
    data() {
        return {
            maxEntities: 300
        };
    },
    components: { DotEntity }
})

</script>


<style lang="scss">
.animated-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    width: 100vdw;
    height: 100vdh;
    z-index: -100;
}

.homeDash-content {
    position: absolute;
    z-index: 100;
}
</style>