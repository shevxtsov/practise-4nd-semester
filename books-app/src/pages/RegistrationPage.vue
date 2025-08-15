<template>
    <div class="login-page">
        <div class="container">
            <div class="login-form">
                <div class="form-card">
                    <h2 class="login-form__title">Регистрация</h2>

                    <MInput v-model="form.username" placeholder="Логин" />
                    <MInput v-model="form.password" placeholder="Пароль" type="password" />
                    <MInput v-model="form.firstname" placeholder="Имя" />
                    <MInput v-model="form.lastname" placeholder="Фамилия" />
                    <MInput v-model="form.image" placeholder="Аватарка" />
                    <div v-if="userAlreadeExists" class="incorrect-creds">Пользователь с таким логином уже существует</div>
                    <MButton color="primary" @click="submitAdd"> Зарегистрироваться </MButton>

                    <div class="registration-link" @click="$router.replace({ name: 'login' })">
                        Уже есть аккаунт?
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'

import MButton from '../components/ui/MButton.vue'
import MInput from '@/components/ui/MInput.vue'
import { useUsersStore } from '../stores/users'
import { storeToRefs } from 'pinia'

const usersStore = useUsersStore()
const { userAlreadeExists } = storeToRefs(usersStore)

const form = reactive({
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    image: ''
})

const submitAdd = () => {
    usersStore.registerUser(form)
}
</script>

<style scoped lang="scss">
.page-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
}
.modal-actions {
    display: flex;
    align-items: center;
    gap: 8px;
}

.lock-icon {
    path {
        stroke: $orange;
    }
}
.login-page {
    background-color: #e7e7e7;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.login-form {
    &__title {
        margin-bottom: 16px;
        font-weight: 600;
        font-size: 20px;
    }
}

.form-card {
    padding: 24px;
    max-width: 400px;
    border-radius: 12px;
    background-color: #fff;

    input {
        margin-bottom: 10px;
    }
}

.registration-link {
    text-decoration: underline;
    color: $primary;
    cursor: pointer;
    margin-top: 10px;

    &:hover {
        text-decoration: none;
    }
}

.incorrect-creds {
    color: $red;
}
</style>
