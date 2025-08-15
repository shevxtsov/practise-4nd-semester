<template>
    <div class="login-page">
        <div class="container">
            <LoginForm />
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

import LoginForm from '../components/auth/LoginForm.vue'
import { useUsersStore } from '../stores/users'

const router = useRouter()
const usersStore = useUsersStore()
const { isLoggedIn } = storeToRefs(usersStore)

onBeforeMount(() => {
    if (isLoggedIn.value) {
        router.back()
    }
})
</script>

<style scoped lang="scss">
.login-page {
    background-color: #e7e7e7;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
