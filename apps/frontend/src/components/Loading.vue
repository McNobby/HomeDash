<template>
    <img class="blue" src="/dash.png" />
</template>

<style scoped lang="scss">
@keyframes glow {
    0% {
        scale: 1;
        filter: drop-shadow(0 0 2em #4bc5db);
    }
    50% {
        filter: drop-shadow(0 0 4em #4bc5db);
        scale: 0.9;
    }
    100% {
        scale: 1;
        filter: drop-shadow(0 0 2em #4bc5db);
    }
}
</style>