import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

export const useTravelsStore = defineStore(
    'travels',
    () => {
        const authStore = useAuthStore()

        const travels = ref([
            {
                id: 1,
                title: 'Test 1',
                text: 'Text about something...',
                price: 12000,
                author: {
                    id: 1,
                    username: 'admin',
                    image: 'https://cdn-icons-png.flaticon.com/512/6063/6063734.png'
                },
                heritages: [
                    {
                        id: 1,
                        name: 'Пирамида Хеопса',
                        image: 'https://goldtravel.by/assets/img/slider/egipet/dostoprimechatelnosti/sfinks-i-piramida-heopsa/1.jpg',
                        link: ''
                    },
                    {
                        id: 2,
                        name: 'Колосс Родосский',
                        image: 'https://viimiracula.ru/wp-content/uploads/article_1_149.jpg',
                        link: 'https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D0%BB%D0%BE%D1%81%D1%81_%D0%A0%D0%BE%D0%B4%D0%BE%D1%81%D1%81%D0%BA%D0%B8%D0%B9'
                    }
                ],
                places: [
                    {
                        id: 1,
                        name: 'Медеу',
                        text: 'Краткое описание места для посещения думаю будет очень интересно',
                        image: 'https://viimiracula.ru/wp-content/uploads/article_1_149.jpg'
                    },
                    {
                        id: 2,
                        name: 'БАО',
                        text: 'Краткое описание места для посещения думаю будет очень интересно',
                        image: 'https://viimiracula.ru/wp-content/uploads/article_1_149.jpg'
                    }
                ]
            }
        ])

        const addTravel = (newTravel) => {
            const fullNewTravel = {
                ...newTravel,
                id: travels.value.length + 1,
                title: newTravel.title || 'Без названия',
                author: authStore.currentUser
            }

            travels.value = [...travels.value, fullNewTravel]
        }

        return {
            travels,
            addTravel
        }
    },
    {
        persist: {
            paths: ['travels']
        }
    }
)
