<template>
  <a class="glass dashItem" :href="link">
      <img v-if="image" :src="image" :alt="title" >
      <img v-else :src="logo" :alt="title" >
<!--      <img v-else :src="" :alt="title" >-->
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
  </a>
</template>

<script lang="ts">

import {defineComponent} from "vue";

export default defineComponent({
    name: "DashItem",
    props: {
        title: {
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
        },
        link: {
            type: String,
            required: true
        },
        dashId: {
            type: String,
            required: true
        }
    },
    computed: {
      logo() {
          return `https://besticon-demo.herokuapp.com/icon?url=${this.link}&size=64..120..200`
      }
    }
})

</script>

<style scoped lang="scss">

.dashItem{
  width: 20rem;
  height: 5rem;
  border-radius: 1rem;
  padding: .5rem;

  text-decoration: none;
  color: #ffffff;

  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 0 1rem;
  grid-template-areas:
    "img title"
    "img description";
  align-items: center;
}

img{
  grid-area: img;
  width: 100%;
  border-radius: 1rem;
}

h3{
  grid-area: title;
  font-size: 1.4rem;
}

p{
  grid-area: description;
  margin: 0;
  font-size: 1rem;
}

</style>