import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUsersStore } from './users'

export const useOrdersStore = defineStore(
    'orders',
    () => {
        const usersStore = useUsersStore()

        const orders = ref({})
        const rents = ref({})

        const addOrder = (book) => {
            const existedBooksByUser = orders.value[String(usersStore.currentUser?.id)]

            if (existedBooksByUser) {
                const alreadyExistedBook = existedBooksByUser.find(
                    (exBook) => exBook.id === book.id
                )

                if (alreadyExistedBook) {
                    return
                }
            }

            orders.value = {
                ...orders.value,
                [String(usersStore.currentUser?.id)]: existedBooksByUser
                    ? [...existedBooksByUser, book]
                    : [book]
            }
        }

        const addRent = (book, rentOption) => {
            const rentOptionsByDays = {
                1: 14,
                2: 30,
                3: 90
            }
            const rentDuration = rentOptionsByDays[String(rentOption.id)]
            const end = new Date(Date.now() + rentDuration * 24 * 3600 * 1000)

            const existedBooksByUser = rents.value[String(usersStore.currentUser?.id)]

            if (existedBooksByUser) {
                const alreadyExistedBook = existedBooksByUser.find(
                    (exBook) => exBook.id === book.id
                )

                if (alreadyExistedBook) {
                    return
                }
            }

            rents.value = {
                ...rents.value,
                [String(usersStore.currentUser?.id)]: existedBooksByUser
                    ? [
                          ...existedBooksByUser,
                          {
                              ...book,
                              end: end.toISOString().slice(0, 10)
                          }
                      ]
                    : [
                          {
                              ...book,
                              end: end.toISOString().slice(0, 10)
                          }
                      ]
            }
        }

        const removeOrder = (userId, bookId) => {
            const existedUser = usersStore.getUserById(userId)

            if (!existedUser) {
                console.error('Пользователь не найден')
                return
            }

            const existedOrder = getOrderByUserId(userId)

            if (!existedOrder) {
                console.error('Заказа не найдено')
                return
            }

            orders.value = {
                ...orders.value,
                [String(userId)]: existedOrder.filter((exBook) => exBook.id !== bookId) || []
            }
        }

        const removeRent = (userId, bookId) => {
            const existedUser = usersStore.getUserById(userId)

            if (!existedUser) {
                console.error('Пользователь не найден')
                return
            }

            const existedRent = getRentByUserId(userId)

            if (!existedRent) {
                console.error('Аренды не найдено')
                return
            }

            rents.value = {
                ...rents.value,
                [String(userId)]: existedRent.filter((exBook) => exBook.id !== bookId) || []
            }
        }

        const getOrderByUserId = (userId) => {
            for (const [orderUserId, books] of Object.entries(orders.value)) {
                if (orderUserId === String(userId)) {
                    return books
                }
            }

            return []
        }

        const getRentByUserId = (userId) => {
            for (const [rentUserId, books] of Object.entries(rents.value)) {
                if (rentUserId === String(userId)) {
                    return books
                }
            }

            return []
        }

        const getUsersRentByBookId = (bookId) => {
            const usersIds = []

            for (const [rentUserId, books] of Object.entries(rents.value)) {
                for (const rentBook of books) {
                    if (rentBook.id === bookId) {
                        usersIds.push(rentUserId)
                    }
                }
            }

            const rentUsers = []

            for (const userId of usersIds) {
                const foundUser = usersStore.getUserById(Number(userId))

                if (foundUser) {
                    rentUsers.push(foundUser)
                }
            }

            return rentUsers
        }

        const getMyBooks = computed(() => {
            return [
                ...getOrderByUserId(usersStore.currentUser?.id),
                ...getRentByUserId(usersStore.currentUser?.id)
            ]
        })

        return {
            orders,
            rents,
            addOrder,
            removeOrder,
            getOrderByUserId,
            getMyBooks,
            addRent,
            removeRent,
            getRentByUserId,
            getUsersRentByBookId
        }
    },
    {
        persist: {
            paths: ['orders', 'rents']
        }
    }
)
