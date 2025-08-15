import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth'

export const useFollowsStore = defineStore(
    'follows',
    () => {
        const authStore = useAuthStore()

        const follows = ref([])

        const followUser = (userId) => {
            const existedUser = authStore.getUserById(userId)

            if (!existedUser) {
                console.error('Пользователь не найден')
                return
            }

            if (authStore.currentUser?.id === existedUser.id) {
                console.error('Нельзя подписаться на себя')

                return
            }

            const newFollow = {
                id: follows.value.length + 1,
                followerId: authStore.currentUser?.id,
                followingId: existedUser.id
            }

            follows.value = [...follows.value, newFollow]
        }

        const unfollowUser = (userId) => {
            const existedUser = authStore.getUserById(userId)

            if (!existedUser) {
                console.error('Пользователь не найден')
                return
            }

            if (authStore.currentUser?.id === existedUser.id) {
                console.error('Нельзя отписаться от себя')

                return
            }

            const existedFollow = getFollowByFollowingId(userId)

            if (!existedFollow) {
                console.error('Подписки не существует')
                return
            }

            follows.value = follows.value.filter((follow) => follow.id !== existedFollow.id)
        }

        const getFollowByFollowingId = (followingId) => {
            return follows.value.find(
                (follow) =>
                    follow.followingId === followingId &&
                    follow.followerId === authStore.currentUser?.id
            )
        }

        return {
            follows,
            followUser,
            unfollowUser,
            getFollowByFollowingId
        }
    },
    {
        persist: {
            paths: ['follows']
        }
    }
)
