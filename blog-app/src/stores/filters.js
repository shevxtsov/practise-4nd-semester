import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFiltersStore = defineStore(
    'filters',
    () => {
        const filters = ref([
            {
                id: 1,
                name: 'природа'
            }
        ])

        const addFilter = (newFilter) => {
            const fullNewFilter = {
                ...newFilter,
                id: filters.value.length + 1
            }

            filters.value = [...filters.value, fullNewFilter]
        }

        return {
            filters,
            addFilter
        }
    },
    {
        persist: {
            paths: ['filters']
        }
    }
)
