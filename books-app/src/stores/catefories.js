import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCategoriesStore = defineStore(
    'categories',
    () => {
        const categoris = ref([
            {
                id: 1,
                name: 'Детектив'
            }
        ])

        const addCategory = (newCategory) => {
            const fullNewCategory = {
                ...newCategory,
                id: categoris.value.length + 1
            }

            categoris.value = [...categoris.value, fullNewCategory]
        }

        return {
            categoris,
            addCategory
        }
    },
    {
        persist: {
            paths: ['categoris']
        }
    }
)
