import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useBooksStore = defineStore(
    'books',
    () => {
        const books = ref([
            {
                id: 1,
                title: 'Большая четверка',
                image: 'https://simg.marwin.kz/media/catalog/product/cache/8d1771fdd19ec2393e47701ba45e606d/c/o/cover1__w600_57_208.jpg',
                category: {
                    id: 1,
                    name: 'Детектив'
                },
                author: {
                    id: 1,
                    name: 'Агата Кристи'
                },
                year: 2005,
                price: 1200,
                in_stock: true,
                status: ''
            }
        ])
        const selectedFilterCategory = ref(null)
        const selectedFilterAuthor = ref(null)
        const selectedFilterYear = ref('')
        const filteredBooks = ref([])

        const addBook = (newBook) => {
            const fullNewBook = {
                ...newBook,
                id: books.value.length + 1,
                title: newBook.title || 'Без названия',
                status: ''
            }

            books.value = [...books.value, fullNewBook]
        }

        const editBook = (bookId, editableBook) => {
            const existedBook = getBookById(bookId)

            if (!existedBook) {
                console.error('Такой книги не существует')
                return
            }

            books.value = books.value.map((book) => {
                if (book.id === bookId) {
                    return {
                        ...book,
                        ...editableBook
                    }
                }

                return book
            })
        }

        const getBookById = (bookId) => {
            return books.value.find((book) => book.id === bookId)
        }

        const deleteBookById = (bookId) => {
            const existedBook = getBookById(bookId)

            if (!existedBook) {
                console.error('Такой книги не существует')
                return
            }

            books.value = books.value.filter((book) => book.id !== bookId)
        }

        const getBooksByFilter = computed(() => {
            if (selectedFilterCategory.value?.id && selectedFilterAuthor.value?.id) {
                filteredBooks.value = books.value.filter(
                    (book) =>
                        book.author.id === selectedFilterAuthor.value?.id &&
                        book.category.id === selectedFilterCategory.value?.id
                )
            } else if (selectedFilterCategory.value?.id && !selectedFilterAuthor.value?.id) {
                filteredBooks.value = books.value.filter(
                    (book) => book.category.id === selectedFilterCategory.value?.id
                )
            } else if (selectedFilterAuthor.value?.id && !selectedFilterCategory.value?.id) {
                filteredBooks.value = books.value.filter(
                    (book) => book.author.id === selectedFilterAuthor.value?.id
                )
            } else if (selectedFilterYear.value) {
                filteredBooks.value = books.value.filter((book) =>
                    String(book.year).includes(selectedFilterYear.value)
                )
            }

            return filteredBooks.value
        })

        const resetFilters = () => {
            selectedFilterAuthor.value = null
            selectedFilterCategory.value = null
            selectedFilterYear.value = ''
            filteredBooks.value = []
        }

        return {
            books,
            selectedFilterCategory,
            selectedFilterAuthor,
            selectedFilterYear,
            addBook,
            editBook,
            getBookById,
            deleteBookById,
            getBooksByFilter,
            resetFilters
        }
    },
    {
        persist: {
            paths: ['books']
        }
    }
)
