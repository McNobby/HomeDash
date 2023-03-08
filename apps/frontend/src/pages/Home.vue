<script lang="ts">
import { defineComponent } from 'vue';


    export default defineComponent({

    })
    
</script>

<template>
    <div class="wrap">
        <h1>Here be thy main menu</h1>
        <img class="blue" src="/dash.png" />
    </div>
</template>

<style scoped lang="scss">
    .wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 100vh;
        gap: 5rem;
        
        img {
            height: 10rem;
        }

        .blue{
            filter: drop-shadow(0 0 4em #4bc5db);
        }
}
</style>