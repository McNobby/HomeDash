<template>
    <div class="glass card dash-card" ref="card"
        @mouseover="hover = true"
        @mouseleave="hover = false"
        :data-hover="hover"
    >
        <h2>{{ name }}</h2>
        <p>{{ description }}</p>
        <div v-if="image" :class="{show: hover, hide: !hover}" class="image" ref="img" ></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    props: {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: false
        }
    },
    data() {
        return {
            hover: false
        }
    },
    mounted() {
        let imgEl = <HTMLDivElement>this.$refs.img
        imgEl.style.backgroundImage = `url(${this.image})`
    }

})

</script>


<style scoped lang="scss">
.show {
    opacity: 1;
}

.hide {
    opacity: 0;
}

.image{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: -1;
    transition: opacity .3s;
    background-size: cover;
    background-repeat: no-repeat;
    filter: blur(5px)
}

.dash-card{
    height: 15rem;
    width: 30rem;

    position: relative;
    z-index: 1;
    overflow: hidden;
    user-select: none;
    cursor: pointer;
    scale: initial;
    margin: auto;
}
</style>