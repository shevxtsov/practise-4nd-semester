<template>
    <main class="wrapper">
        <MHeader v-if="isLoggedIn" />
        <div class="content">
            <MLoader v-if="isPreLoader" full preloader />
            <RouterView />
        </div>
        <MFooter v-if="isLoggedIn" />
    </main>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

import MFooter from './components/layout/MFooter.vue'
import MHeader from './components/layout/MHeader.vue'
import MLoader from '@/components/ui/MLoader.vue'
import { useUsersStore } from './stores/users'

const usersStore = useUsersStore()
const { isLoggedIn, isPreLoader } = storeToRefs(usersStore)

onMounted(() => {
    usersStore.getCurrentUser()
})
</script>

<style scoped></style>
