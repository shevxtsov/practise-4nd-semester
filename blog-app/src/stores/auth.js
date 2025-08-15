import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore(
    'auth',
    () => {
        const router = useRouter()

        const users = ref([
            {
                id: 1,
                username: 'admin',
                firstname: 'Admin',
                lastname: 'Admin',
                is_admin: true,
                is_blocked: false,
                image: 'https://cdn-icons-png.flaticon.com/512/6063/6063734.png',
                password: '123'
            }
        ])
        const currentUser = ref(null)
        const isLoggedIn = ref(false)
        const isLoading = ref(false)
        const isPreLoader = ref(false)
        const incorrectCredentials = ref(false)
        const userAlreadeExists = ref(false)

        const registerUser = (newUser) => {
            userAlreadeExists.value = false

            const userExists = getUserByUsername(newUser.username)

            if (userExists) {
                userAlreadeExists.value = true

                return
            }

            const fullNewUser = {
                ...newUser,
                id: users.value.length + 1,
                is_admin: false,
                is_blocked: false,
                image: newUser.image || ''
            }

            users.value = [...users.value, fullNewUser]

            currentUser.value = fullNewUser
            isLoggedIn.value = true
            router.replace({ name: 'home' })
        }

        const loginUser = (credentials) => {
            incorrectCredentials.value = false

            const existedUser = getUserByUsername(credentials.username)

            if (!existedUser) {
                incorrectCredentials.value = true

                return
            }

            if (existedUser.password === credentials.password) {
                currentUser.value = existedUser
                isLoggedIn.value = true
                router.replace({ name: 'home' })
            } else {
                incorrectCredentials.value = true
                isLoggedIn.value = false
                currentUser.value = null
            }
        }

        const getUserByUsername = (username) => {
            return users.value.find((user) => user.username === username)
        }

        const getUserById = (userId) => {
            return users.value.find((user) => user.id === userId)
        }

        const logoutUser = () => {
            router.replace({ name: 'login' })
            currentUser.value = null
            isLoggedIn.value = false
        }

        const getCurrentUser = async () => {
            preLoaderHandler()

            if (currentUser.value) {
                isLoggedIn.value = true
                isPreLoader.value = false
            } else {
                isLoggedIn.value = false

                router.replace({ name: 'login' })
            }
        }

        const preLoaderHandler = async () => {
            isPreLoader.value = true
            await new Promise((resolve) => setTimeout(resolve, 1000))
            isPreLoader.value = false
        }

        const getUsersForAccess = computed(() => {
            return users.value.map((user) => {
                return {
                    id: user.id,
                    name: user.username
                }
            })
        })

        return {
            users,
            currentUser,
            isLoggedIn,
            isLoading,
            isPreLoader,
            incorrectCredentials,
            userAlreadeExists,
            registerUser,
            loginUser,
            getCurrentUser,
            logoutUser,
            getUserById,
            getUsersForAccess
        }
    },
    {
        persist: {
            paths: ['currentUser', 'users']
        }
    }
)
