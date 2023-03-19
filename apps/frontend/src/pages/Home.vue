<template>
    <div class="center">
        <div class="home">
            <div class="glass card">
                <h1>Home</h1>
                <p>
                    This is the <strong>Best</strong> Dashboard you have
                </p>
            </div>
            <div class="glass card">
                <h1>Home</h1>
                <p>
                    This is the <strong>Best</strong> Dashboard you have
                </p>
            </div>
            <div class="glass card">
                <h1>Home</h1>
                <p>
                    This is the <strong>Best</strong> Dashboard you have
                </p>
            </div>
            <div class="glass card">
                <h1>Home</h1>
                <p>
                    This is the <strong>Best</strong> Dashboard you have
                </p>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
})
    
</script>

<style scoped lang="scss">

.home{
    display: grid;
    width: 90%;
    gap: 2rem 1rem;
    margin: 0 auto;
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
}

</style>
