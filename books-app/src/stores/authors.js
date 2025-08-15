import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthorsStore = defineStore(
    'authors',
    () => {
        const authors = ref([
            {
                id: 1,
                name: 'Агата Кристи'
            }
        ])

        const addAuthor = (newAuthor) => {
            const fullNewAuthor = {
                ...newAuthor,
                id: authors.value.length + 1
            }

            authors.value = [...authors.value, fullNewAuthor]
        }

        return {
            authors,
            addAuthor
        }
    },
    {
        persist: {
            paths: ['authors']
        }
    }
)
