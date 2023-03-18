

<template>
     <nav v-if="AuthStore.isLoggedIn()">
        <span>Hello {{ username }}</span>
    
        <button class="logout" @click="logout">Logout</button>

    </nav>
    <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AuthStore from './data-management/stores/auth';

export default defineComponent( {

  data() {
    return {
      username: '',
      AuthStore
    }
  },
  watch:{
    $route() {
      if(!this.username) {
        this.setUserName()
      }
    }
  },
  methods: {
    logout() {
      AuthStore.logout()
      this.setUserName()
      this.$router.push('/login')
    },
    async setUserName() {
      this.username = (await AuthStore.getUser()).username
    }
  }
})
</script>

<style lang="scss">

nav{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgb(0,0,0);
  background: linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(9,11,11,0) 100%); 
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 600;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}

.logout {
  all: unset;
  cursor: pointer;
  background: #ffffff2d;
  padding: .5rem 1rem;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  transition: all .2s ease-in-out;
  &:hover {
  background: #fd6969;
  }

}

</style>