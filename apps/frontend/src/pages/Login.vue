<template>
    <div class="center-wrap">
        <div class="glass login">
            <h2>Login</h2>
            <form @submit="ev => login(ev)">
                <input required type="text" placeholder="Username" v-model="username">
                <input required type="password" placeholder="Password" v-model="password">
                <button type="submit">Login</button>
            </form>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import AuthStore from '../data-management/stores/auth';

    export default defineComponent({
        name: 'Login',
        data: () => {
            return {
                username: '',
                password: '',
                userId: ''
            }
        },
        methods: {
            async login(e: Event) {
                e.preventDefault()
                await AuthStore.loginAndSetToken(this.username, this.password)
                if (AuthStore.isLoggedIn()) {
                    this.$router.push('/')
                }
            }
        }
    })
    
</script>



<style scoped lang="scss">
    .center-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 100dvh;
        gap: 5rem;
    }

    .login {
        height: 32rem;
        width: 25rem;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 2rem;
        
        form {
            
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            input, button {
                margin-bottom: 1rem;
                padding: .5rem;
                width: 80%;
                border: none;
                border-radius: 100px;
                background-color: #f5f5f5;
                padding-left: 1rem;
            }
            button {
                width: 70%;
            }
        }
    }

</style>