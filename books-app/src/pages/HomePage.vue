<template>
    <div class="page">
        <div class="container">
            <div class="page-header">
                <template v-if="isAdmin">
                    <MButton color="primary" @click="handleAdd">Добавить книгу</MButton>
                </template>

                <MButton color="success" @click="setMyBooksEnabled(false)"> Библиотека </MButton>
                <MButton color="warning" @click="setMyBooksEnabled(true)"> Мои книги </MButton>
            </div>

            <template v-if="myBooksEnabled">
                <div v-if="getMyBooks.length > 0" class="books-list">
                    <BookCard v-for="book of getMyBooks" :key="book.name" :book="book">
                        <template #actions>
                            <MButton color="transparent" @click="handleDeleteMyBook(book)">
                                <img src="@/assets/images/delete-icon-color.svg" alt="Удалить" />
                            </MButton>
                        </template>
                    </BookCard>
                </div>

                <div v-if="getMyBooks.length === 0" class="empty">Нет книг</div>
            </template>

            <template v-else>
                <div class="filters">
                    <MSelect
                        v-model="selectedFilterCategory"
                        :items="categoris"
                        placeholder="Сортировка по категории"
                    />

                    <MSelect
                        v-model="selectedFilterAuthor"
                        :items="authors"
                        placeholder="Сортировка по автору"
                    />

                    <MInput v-model="selectedFilterYear" placeholder="Год написания" />

                    <MButton color="error" @click="booksStore.resetFilters"> Сбросить </MButton>
                </div>

                <template v-if="getBooksByFilter.length > 0">
                    <div v-if="getBooksByFilter" class="books-list">
                        <BookCard v-for="book of getBooksByFilter" :key="book.name" :book="book">
                            <template #actions>
                                <template v-if="isAdmin">
                                    <MButton color="transparent" @click="handleEdit(book)">
                                        <img
                                            src="@/assets/images/edit-icon-color.svg"
                                            alt="Редактировать"
                                        />
                                    </MButton>
                                    <MButton color="transparent" @click="handleDelete(book)">
                                        <img
                                            src="@/assets/images/delete-icon-color.svg"
                                            alt="Удалить"
                                        />
                                    </MButton>
                                </template>

                                <template v-else>
                                    <MButton
                                        v-if="currentUser?.wishlist.includes(book.id)"
                                        color="transparent"
                                        @click.stop="usersStore.removeBookFromWishlist(book.id)"
                                    >
                                        <img
                                            class="book-wishlist fill"
                                            src="@/assets/images/star-fill-blue-icon.svg"
                                            alt="Избранное"
                                        />
                                    </MButton>
                                    <MButton
                                        v-else
                                        color="transparent"
                                        @click.stop="usersStore.addBookToWishlist(book.id)"
                                    >
                                        <img
                                            class="book-wishlist"
                                            src="@/assets/images/star-gray-icon.svg"
                                            alt="Избранное"
                                        />
                                    </MButton>
                                    <MButton color="transparent" @click.stop="handleBuy(book)">
                                        <img src="@/assets/images/cart-icon.svg" alt="Корзина" />
                                    </MButton>
                                </template>
                            </template>
                        </BookCard>
                    </div>

                    <div v-if="getBooksByFilter.length === 0" class="empty">Нет книг</div>
                </template>

                <template v-else>
                    <div v-if="books.length > 0" class="books-list">
                        <BookCard v-for="book of books" :key="book.name" :book="book">
                            <template #actions>
                                <template v-if="isAdmin">
                                    <MButton color="transparent" @click="handleEdit(book)">
                                        <img
                                            src="@/assets/images/edit-icon-color.svg"
                                            alt="Редактировать"
                                        />
                                    </MButton>
                                    <MButton color="transparent" @click="handleDelete(book)">
                                        <img
                                            src="@/assets/images/delete-icon-color.svg"
                                            alt="Удалить"
                                        />
                                    </MButton>
                                </template>

                                <template v-else>
                                    <MButton
                                        v-if="currentUser?.wishlist.includes(book.id)"
                                        color="transparent"
                                        @click.stop="usersStore.removeBookFromWishlist(book.id)"
                                    >
                                        <img
                                            class="book-wishlist fill"
                                            src="@/assets/images/star-fill-blue-icon.svg"
                                            alt="Избранное"
                                        />
                                    </MButton>
                                    <MButton
                                        v-else
                                        color="transparent"
                                        @click.stop="usersStore.addBookToWishlist(book.id)"
                                    >
                                        <img
                                            class="book-wishlist"
                                            src="@/assets/images/star-gray-icon.svg"
                                            alt="Избранное"
                                        />
                                    </MButton>
                                    <MButton color="transparent" @click.stop="handleBuy(book)">
                                        <img src="@/assets/images/cart-icon.svg" alt="Корзина" />
                                    </MButton>
                                </template>
                            </template>
                        </BookCard>
                    </div>

                    <div v-if="books.length === 0" class="empty">Нет книг</div>
                </template>
            </template>

            <MModal v-model="modalState.add">
                <div class="modal-content">
                    <MInput v-model="formBook.title" placeholder="Название" />
                    <MInput v-model="formBook.image" placeholder="URL изображения" />
                    <MInput v-model="formBook.year" placeholder="Год написания" />
                    <MInput v-model="formBook.price" placeholder="Цена" />
                    <MToggle v-model="formBook.in_stock" label="В наличии" />

                    <MSelect
                        v-model="formBook.category"
                        :items="categoris"
                        placeholder="Выберите категорию"
                    />
                    <div class="modal-content__wrapper">
                        <p>Добавить категорию</p>
                        <MButton color="success" size="small" @click="handleAddCategory">+</MButton>
                    </div>

                    <MSelect
                        v-model="formBook.author"
                        :items="authors"
                        placeholder="Выберите автора"
                    />
                    <div class="modal-content__wrapper">
                        <p>Добавить автора</p>
                        <MButton color="success" size="small" @click="handleAddAuthor">+</MButton>
                    </div>

                    <MButton color="primary" @click="submitAdd"> Сохранить </MButton>
                </div>
            </MModal>

            <MModal v-model="modalState.edit">
                <div class="modal-content">
                    <MInput v-model="formBook.title" placeholder="Название" />
                    <MInput v-model="formBook.image" placeholder="URL изображения" />
                    <MInput v-model="formBook.year" placeholder="Год написания" />
                    <MInput v-model="formBook.price" placeholder="Цена" />
                    <MToggle v-model="formBook.in_stock" label="В наличии" />

                    <MSelect
                        v-model="formBook.category"
                        :items="categoris"
                        placeholder="Выберите категорию"
                    />
                    <div class="modal-content__wrapper">
                        <p>Добавить категорию</p>
                        <MButton color="success" size="small" @click="handleAddCategory">+</MButton>
                    </div>

                    <MSelect
                        v-model="formBook.author"
                        :items="authors"
                        placeholder="Выберите автора"
                    />
                    <div class="modal-content__wrapper">
                        <p>Добавить автора</p>
                        <MButton color="success" size="small" @click="handleAddAuthor">+</MButton>
                    </div>

                    <div
                        v-if="ordersStore.getUsersRentByBookId(selectedBook.id).length > 0"
                        class="book-rent"
                    >
                        <h5>Аренда:</h5>
                        <div
                            v-for="user of ordersStore.getUsersRentByBookId(selectedBook.id)"
                            :key="user.id + user.username"
                            class="book-rent__user"
                        >
                            <div class="book-rent__username">
                                {{ user.firstname }} {{ user.lastname }}
                            </div>
                            <div
                                v-if="ordersStore.getRentByUserId(user.id).length > 0"
                                class="book-rent__rents"
                            >
                                <div
                                    v-for="book in ordersStore.getRentByUserId(user.id)"
                                    :key="book.id + book.title"
                                    class="book-rent__end"
                                >
                                    <template v-if="selectedBook.id === book.id">
                                        до: {{ book.end }}
                                    </template>
                                </div>
                            </div>
                            <div class="book-rent_delete">
                                <MButton color="transparent" @click="handleDeleteRent(user.id)">
                                    <img
                                        src="@/assets/images/delete-icon-color.svg"
                                        alt="Удалить"
                                    />
                                </MButton>
                            </div>
                        </div>
                    </div>

                    <MButton color="primary" @click="submitEdit"> Сохранить </MButton>
                </div>
            </MModal>

            <MModal v-model="modalState.delete">
                <div class="modal-content">
                    <h4>Вы действительно хотите удалить?</h4>
                    <div class="modal-actions">
                        <MButton color="primary" full @click="submitDelete"> Да </MButton>
                        <MButton full @click="toggleModal('delete')"> Нет </MButton>
                    </div>
                </div>
            </MModal>

            <MModal v-model="modalState.addCategory">
                <div class="modal-content">
                    <MInput v-model="formCategory.name" placeholder="Добавьте категорию" />
                    <MButton color="primary" @click="submitCategory"> Сохранить </MButton>
                </div>
            </MModal>

            <MModal v-model="modalState.addAuthor">
                <div class="modal-content">
                    <MInput v-model="formAuthor.name" placeholder="Добавьте автора" />
                    <MButton color="primary" @click="submitAuthor"> Сохранить </MButton>
                </div>
            </MModal>

            <MModal v-model="modalState.addCart">
                <div class="modal-content">
                    <h5>
                        Вы выбрали книгу: <strong>{{ selectedBook.title }}</strong>
                    </h5>

                    <MSelect
                        v-model="selectedBuyOption"
                        :items="buyOptions"
                        placeholder="Выберите способ покупки"
                    />
                    <MSelect
                        v-if="selectedBuyOption?.id === 2"
                        v-model="selectedRentOption"
                        :items="rentOptions"
                        placeholder="Выберите срок"
                    />

                    <MButton color="primary" @click="cartNextHandler"> Оформить </MButton>
                </div>
            </MModal>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'

import MButton from '@/components/ui/MButton.vue'
import BookCard from '../components/books/BookCard.vue'
import MInput from '@/components/ui/MInput.vue'
import MModal from '@/components/ui/MModal.vue'
import MSelect from '@/components/ui/MSelect.vue'
import MToggle from '@/components/ui/MToggle.vue'
import { useBooksStore } from '../stores/books'
import { useUsersStore } from '../stores/users'
import { useCategoriesStore } from '../stores/catefories'
import { useAuthorsStore } from '../stores/authors'
import { useOrdersStore } from '../stores/orders'

const usersStore = useUsersStore()
const { currentUser, isAdmin } = storeToRefs(usersStore)
const booksStore = useBooksStore()
const {
    books,
    selectedFilterCategory,
    selectedFilterAuthor,
    selectedFilterYear,
    getBooksByFilter
} = storeToRefs(booksStore)
const categoriesStore = useCategoriesStore()
const { categoris } = storeToRefs(categoriesStore)
const authorsStore = useAuthorsStore()
const { authors } = storeToRefs(authorsStore)
const ordersStore = useOrdersStore()
const { getMyBooks } = storeToRefs(ordersStore)
const myBooksEnabled = ref(false)

const buyOptions = [
    {
        id: 1,
        name: 'Купить'
    },
    {
        id: 2,
        name: 'Арендовать'
    }
]
const rentOptions = [
    {
        id: 1,
        name: '2 недели'
    },
    {
        id: 2,
        name: 'Месяц'
    },
    {
        id: 3,
        name: '3 месяца'
    }
]

const selectedBuyOption = ref(buyOptions[0])
const selectedRentOption = ref(rentOptions[0])

const modalState = reactive({
    add: false,
    edit: false,
    delete: false,
    addCategory: false,
    addAuthor: false,
    addComment: false,
    addCart: false
})

const formBook = reactive({
    title: '',
    image: '',
    category: null,
    author: null,
    year: '',
    price: '',
    in_stock: true
})

const formCategory = reactive({
    name: ''
})

const formAuthor = reactive({
    name: ''
})

const selectedBook = ref(null)

const toggleModal = (key) => {
    modalState[key] = !modalState[key]
}

const handleAdd = () => {
    formBook.title = ''
    formBook.image = ''
    formBook.category = null
    formBook.author = null
    formBook.year = ''
    formBook.price = ''
    formBook.in_stock = true

    toggleModal('add')
}

const handleEdit = (book) => {
    formBook.title = book.title
    formBook.image = book.image
    formBook.category = book.category
    formBook.author = book.author
    formBook.year = book.year
    formBook.price = book.price
    formBook.in_stock = book.in_stock

    selectedBook.value = book

    toggleModal('edit')
}

const handleDelete = (book) => {
    selectedBook.value = book

    toggleModal('delete')
}

const handleBuy = (book) => {
    selectedBook.value = book

    toggleModal('addCart')
}

const submitAdd = () => {
    booksStore.addBook(formBook)
    toggleModal('add')
}

const submitEdit = () => {
    booksStore.editBook(selectedBook.value.id, formBook)
    toggleModal('edit')
}

const submitDelete = () => {
    booksStore.deleteBookById(selectedBook.value.id)
    toggleModal('delete')
}

const handleAddCategory = () => {
    formCategory.name = ''

    toggleModal('addCategory')
}

const handleAddAuthor = () => {
    formAuthor.name = ''

    toggleModal('addAuthor')
}

const submitCategory = () => {
    categoriesStore.addCategory(formCategory)
    toggleModal('addCategory')
}

const submitAuthor = () => {
    authorsStore.addAuthor(formAuthor)
    toggleModal('addAuthor')
}

const cartNextHandler = () => {
    toggleModal('addCart')

    if (selectedBuyOption.value.id === 1) {
        ordersStore.addOrder(selectedBook.value)

        return
    }

    if (selectedBuyOption.value.id === 2) {
        ordersStore.addRent(selectedBook.value, selectedRentOption.value)
    }
}

const setMyBooksEnabled = (value) => {
    myBooksEnabled.value = value
}

const handleDeleteMyBook = (book) => {
    if (book.end) {
        ordersStore.removeRent(currentUser.value.id, book.id)
        return
    }

    ordersStore.removeOrder(currentUser.value.id, book.id)
}

const handleDeleteRent = (userId) => {
    ordersStore.removeRent(userId, selectedBook.value.id)
}
</script>

<style scoped lang="scss">
.page {
    background-color: $gray-light;
    min-height: 90vh;
}

.books-list {
    display: grid;
    gap: 24px;
    grid-template-columns: repeat(4, 1fr);
    margin-top: 20px;
}

.modal-content {
    display: flex;
    flex-direction: column;
    gap: 12px;

    &__wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
    }

    h5 {
        font-size: 18px;
        line-height: 110%;

        strong {
            font-weight: 600;
            display: block;
        }
    }
}

.modal-actions {
    display: flex;
    align-items: center;
    gap: 8px;
}

.reset-filters {
    display: flex;
    justify-content: center;
}

.post-author {
    margin-right: auto;
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;

    &__image {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        overflow: hidden;

        img {
            object-fit: cover;
            width: 100%;
            height: 100%;
            display: block;
        }
    }

    &__text {
        font-size: 18px;
    }
}

.book-wishlist {
    width: 28px;

    &.fill {
        width: 31px;
    }
}

.filters {
    margin-top: 16px;
    padding: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: #fff;
    border-radius: 12px;

    &:deep(.input) {
        width: auto;
    }
}

.book-rent {
    h5 {
        font-size: 18px;
        font-weight: 600;
    }

    &__user {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        justify-content: space-between;
        padding: 5px 0;
    }
}
</style>
