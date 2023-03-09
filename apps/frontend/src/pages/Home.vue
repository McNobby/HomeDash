<template>
    <p>{{ Auth.store.token }}</p>
    <div class="center-wrap">
        <div class="glass card login">
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
                Auth: new AuthStore()
            }
        },
        methods: {
            login(e: Event) {
                e.preventDefault()
                this.Auth.loginAndSetToken(this.username, this.password)
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
        position: absolute;

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