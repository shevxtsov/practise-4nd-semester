<template>
    <div class="login-form">
        <div class="form-card">
            <h2 class="login-form__title">Авторизация</h2>

            <MInput v-model="form.username" placeholder="Логин" />
            <MInput v-model="form.password" placeholder="Пароль" type="password" />

            <div v-if="incorrectCredentials" class="incorrect-creds">Некорректные данные</div>
            
            <MButton color="primary" @click="submit">Войти</MButton>

            <div class="registration-link" @click="$router.replace({ name: 'registration' })">
                Регистрация
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { storeToRefs } from 'pinia'

import MButton from '../ui/MButton.vue'
import MInput from '../ui/Minput.vue'
import { useUsersStore } from '../../stores/users'

const form = reactive({
    username: '',
    password: ''
})

const usersStore = useUsersStore()
const { incorrectCredentials } = storeToRefs(usersStore)

const submit = () => {
    usersStore.loginUser(form)
}
</script>

<style scoped lang="scss">
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

.incorrect-creds {
    color: $red;
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
</style>
