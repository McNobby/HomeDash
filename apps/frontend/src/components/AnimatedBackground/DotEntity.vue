<template>
    <div class="dot-entity" :id="id.toString()" ref="me" :style="style">
    </div>
</template>

<script lang="ts">
import { CSSProperties, defineComponent } from 'vue';



export default defineComponent({
    data() {
        return {
            count: 0
        }
    },
    props: {
        size: {
            type: Number,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        id: {
            type: Number,
            required: true
        }
    },
    computed: {
        style(): CSSProperties {
            return {
                position: 'absolute',
                left: `${this.x*2}px`,
                top: `${this.y}px`,
                width: `${this.size}px`,
                height: `${this.size}px`,
                backgroundColor: this.color,
            }
        },
        x() {
            return Math.random() * window.innerHeight;
        },
        y() {
            return Math.random() * window.innerWidth;
        }
    },
    created() {

        setInterval(() => {
            let div = <HTMLElement>document.getElementById(this.id.toString())
            div.style.top = `${parseInt(div.style.top.split('p')[0]) +(Math.random() * 450)-250}px`;
            
            div.style.left = `${parseInt(div.style.left.split('p')[0]) +(Math.random() * 450)-250}px`;
        }, (Math.random() * 11000)+1000)



    },
    
})
</script>

<style lang="scss">
.dot-entity {
    border-radius: 50%;
    transition: all 2s ease-in-out;
    margin: 5rem;
}
</style>