<template>
    <div class="user-profile">
        <MButton color="transparent" @click="toggleDropdown" v-click-outside="closeDropdown">
            <div class="user-profile__gen">
                <div class="user-profile__image">
                    <img
                        :src="
                            currentUser.image ||
                            'https://icon-library.com/images/anonymous-icon-png/anonymous-icon-png-5.jpg'
                        "
                        :alt="currentUser.firstname"
                    />
                </div>
                <span class="user-profile__text"> {{ currentUser.firstname }} {{ currentUser.lastname }} </span>
            </div>
        </MButton>

        <div v-show="isOpen" class="dropdown">
            <ul>
                <li>
                    <RouterLink to="/">
                        <img src="@/assets/images/user-icon.svg" alt="Профиль" />
                        <span>Профиль</span>
                    </RouterLink>
                </li>
                <li>
                    <MButton color="transparent" @click="logoutUser">
                        <div class="logout">
                            <img src="@/assets/images/logout-icon.svg" alt="Выйти" />
                            <span>Выйти</span>
                        </div>
                    </MButton>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

import { useAuthStore } from '../../stores/auth'
import MButton from '../ui/MButton.vue'

const authStore = useAuthStore()
const { currentUser } = storeToRefs(authStore)
const isOpen = ref(false)

const toggleDropdown = () => {
    isOpen.value = !isOpen.value
}

const closeDropdown = () => {
    isOpen.value = false
}

const logoutUser = () => {
    authStore.logoutUser()
}
</script>

<style scoped lang="scss">
.user-profile {
    position: relative;

    &__gen {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    &__image {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        overflow: hidden;

        img {
            object-fit: cover;
            width: 100%;
            height: 100%;
            display: block;
        }
    }

    &__text {
        font-size: 18px;
    }
}

.dropdown {
    position: absolute;
    top: 36px;
    right: 0;
    background-color: #fff;
    padding: 12px;
    border-radius: 6px;
    box-shadow: 1px 1px 10px #2424241a;

    ul {
        li {
            margin-bottom: 8px;
            
            .logout {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 10px;
            }

            a {
                color: #242424;
                font-size: 16px;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .btn.transparent {
                color: #242424;
                font-size: 16px;
                display: flex;
                align-items: center;
                gap: 8px;
            }
        }
    }
}
</style>
