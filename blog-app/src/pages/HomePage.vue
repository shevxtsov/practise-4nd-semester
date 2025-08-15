<template>
    <div class="page">
        <div class="container">
            <div class="page-header">
                <MButton color="primary" @click="handleAdd">Добавить запись</MButton>

                <MButton color="success" @click="setMyFollowing(false)"> Лента </MButton>
                <MButton color="warning" @click="setMyFollowing(true)"> Мои подписки </MButton>

                <div class="filter-list">
                    <div
                        v-for="filter of selectedFilters"
                        :key="filter.name"
                        class="filter-list__item"
                    >
                        #{{ filter.name }}
                        <svg
                            @click.stop="resetFilterHandler(filter.id)"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M18 6L6 18"
                                stroke="black"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M6 6L18 18"
                                stroke="black"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </div>

                    <div v-if="selectedFilters.length > 0" class="reset-filters">
                        <MButton color="error" size="small" @click="handleResetAllFilters">
                            Сбросить все фильтры
                        </MButton>
                    </div>
                </div>
            </div>

            <template v-if="myFollowing">
                <template v-if="selectedFilters.length > 0">
                    <div v-if="getPostsByFilter" class="posts-list">
                        <PostCard
                            v-for="post of getPostsByFilter"
                            :key="post.id"
                            :post="post"
                            :current-user="currentUser"
                            @on-access="onAccessHandler(post)"
                            @on-filter="(filter) => onFilterHandler(filter)"
                        >
                            <template #actions>
                                <div class="post-author">
                                    <div class="post-author__image">
                                        <img
                                            :src="
                                                post.author.image ||
                                                'https://icon-library.com/images/anonymous-icon-png/anonymous-icon-png-5.jpg'
                                            "
                                            :alt="post.author.username"
                                        />
                                    </div>
                                    <span class="post-author__text">
                                        {{ post.author.username }}
                                    </span>
                                </div>

                                <MButton v-if="!post.hidden" color="transparent">
                                    <img
                                        src="@/assets/images/comment-icon.svg"
                                        alt="Комментировать"
                                        @click="handleComment(post)"
                                    />
                                </MButton>
                            </template>
                        </PostCard>
                    </div>
                </template>

                <div v-else-if="getPostsByMyFollowing" class="posts-list">
                    <PostCard
                        v-for="post of getPostsByMyFollowing"
                        :key="post.id"
                        :post="post"
                        :current-user="currentUser"
                        @on-access="onAccessHandler(post)"
                        @on-filter="(filter) => onFilterHandler(filter)"
                    >
                        <template #actions>
                            <div class="post-author">
                                <div class="post-author__image">
                                    <img
                                        :src="
                                            post.author.image ||
                                            'https://icon-library.com/images/anonymous-icon-png/anonymous-icon-png-5.jpg'
                                        "
                                        :alt="post.author.username"
                                    />
                                </div>
                                <span class="post-author__text">
                                    {{ post.author.username }}
                                </span>
                            </div>

                            <MButton v-if="!post.hidden" color="transparent">
                                <img
                                    src="@/assets/images/comment-icon.svg"
                                    alt="Комментировать"
                                    @click="handleComment(post)"
                                />
                            </MButton>
                        </template>
                    </PostCard>
                </div>

                <div v-if="getPostsByMyFollowing.length === 0" class="empty">Нет записей</div>
            </template>

            <template v-else>
                <template v-if="selectedFilters.length > 0">
                    <div v-if="getPostsByFilter" class="posts-list">
                        <PostCard
                            v-for="post of getPostsByFilter"
                            :key="post.id"
                            :post="post"
                            :current-user="currentUser"
                            @on-access="onAccessHandler(post)"
                            @on-filter="(filter) => onFilterHandler(filter)"
                        >
                            <template #actions>
                                <div class="post-author">
                                    <div class="post-author__image">
                                        <img
                                            :src="
                                                post.author.image ||
                                                'https://icon-library.com/images/anonymous-icon-png/anonymous-icon-png-5.jpg'
                                            "
                                            :alt="post.author.username"
                                        />
                                    </div>
                                    <span class="post-author__text">
                                        {{ post.author.username }}
                                    </span>
                                </div>

                                <MButton v-if="!post.hidden" color="transparent">
                                    <img
                                        src="@/assets/images/comment-icon.svg"
                                        alt="Комментировать"
                                        @click="handleComment(post)"
                                    />
                                </MButton>
                            </template>
                        </PostCard>
                    </div>
                </template>

                <div v-else-if="posts" class="posts-list">
                    <PostCard
                        v-for="post of posts"
                        :key="post.id"
                        :post="post"
                        :current-user="currentUser"
                        @on-access="onAccessHandler(post)"
                        @on-filter="(filter) => onFilterHandler(filter)"
                    >
                        <template #actions>
                            <div class="post-author">
                                <div class="post-author__image">
                                    <img
                                        :src="
                                            post.author.image ||
                                            'https://icon-library.com/images/anonymous-icon-png/anonymous-icon-png-5.jpg'
                                        "
                                        :alt="post.author.username"
                                    />
                                </div>
                                <span class="post-author__text">
                                    {{ post.author.username }}
                                </span>

                                <template v-if="currentUser?.id !== post.author.id">
                                    <MButton
                                        v-if="hasFollowing(post.author.id)"
                                        color="outline"
                                        @click="handleUnfollow(post.author.id)"
                                    >
                                        Отписаться
                                    </MButton>
                                    <MButton
                                        v-else
                                        color="warning"
                                        @click="handleFollow(post.author.id)"
                                    >
                                        Подписаться
                                    </MButton>
                                </template>
                            </div>
                            <MButton color="transparent">
                                <img
                                    src="@/assets/images/comment-icon.svg"
                                    alt="Комментировать"
                                    @click="handleComment(post)"
                                />
                            </MButton>

                            <template v-if="post.author.id === currentUser?.id">
                                <MButton color="transparent">
                                    <img
                                        src="@/assets/images/edit-icon-color.svg"
                                        alt="Редактировать"
                                        @click="handleEdit(post)"
                                    />
                                </MButton>
                                <MButton color="transparent">
                                    <img
                                        src="@/assets/images/delete-icon-color.svg"
                                        alt="Удалить"
                                        @click="handleDelete(post)"
                                    />
                                </MButton>
                            </template>
                        </template>
                    </PostCard>
                </div>

                <div v-if="posts.length === 0" class="empty">Нет записей</div>
            </template>

            <MModal v-model="modalState.add">
                <div class="modal-content">
                    <MInput v-model="form.title" placeholder="Наименование" />
                    <MInput v-model="form.text" placeholder="Описание" />
                    <MInput v-model="form.subject" placeholder="Тема" />
                    <MToggle v-model="form.hidden" label="Скрытый пост/по запросу" />

                    <MMultiSelect
                        v-if="form.hidden"
                        v-model="form.allowedUsers"
                        :items="getUsersForAccess"
                        placeholder="Разрешенные пользователи"
                    />

                    <MMultiSelect
                        v-model="form.filterList"
                        :items="filters"
                        placeholder="Выберите теги"
                    />
                    <div class="modal-content__wrapper">
                        <p>Добавить теги</p>
                        <MButton color="success" size="small" @click="handleAddFilter">+</MButton>
                    </div>
                    <MButton color="primary" @click="submitAdd"> Сохранить </MButton>
                </div>
            </MModal>

            <MModal v-model="modalState.edit">
                <div class="modal-content">
                    <MInput v-model="form.title" placeholder="Наименование" />
                    <MInput v-model="form.text" placeholder="Описание" />
                    <MInput v-model="form.subject" placeholder="Тема" />
                    <MToggle v-model="form.hidden" label="Скрытый пост/по запросу" />

                    <MMultiSelect
                        v-if="form.hidden"
                        v-model="form.allowedUsers"
                        :items="getUsersForAccess"
                        placeholder="Разрешенные пользователи"
                        @on-select="(item) => onSelectAllowedUsersHandler(item)"
                    />

                    <template v-if="form.askAccessUsers.length > 0">
                        <span>Запросили доступ:</span>
                        <MMultiSelect
                            v-if="form.hidden"
                            v-model="form.askAccessUsers"
                            :items="form.askAccessUsers"
                            placeholder="Запросили доступ"
                            @on-remove="(item) => onRemoveAskAccessUserHandler(item)"
                        />
                    </template>

                    <MMultiSelect
                        v-model="form.filterList"
                        :items="filters"
                        placeholder="Выберите теги"
                    />
                    <div class="modal-content__wrapper">
                        <p>Добавить теги</p>
                        <MButton color="success" size="small" @click="handleAddFilter">+</MButton>
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

            <MModal v-model="modalState.addFilter">
                <div class="modal-content">
                    <MInput v-model="formFilter.name" placeholder="Добавьте тег" />
                    <MButton color="primary" @click="submitFilter"> Сохранить </MButton>
                </div>
            </MModal>

            <MModal v-model="modalState.addComment">
                <div class="modal-content">
                    <MInput v-model="formComment.text" placeholder="Текст комментария" />
                    <MButton color="primary" @click="submitComment"> Комментировать </MButton>
                </div>
            </MModal>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'

import MButton from '@/components/ui/MButton.vue'
import PostCard from '@/components/posts/PostCard.vue'
import MInput from '@/components/ui/MInput.vue'
import MModal from '@/components/ui/MModal.vue'
import MMultiSelect from '@/components/ui/MMultiSelect.vue'
import MToggle from '@/components/ui/MToggle.vue'
import { useFiltersStore } from '../stores/filters'
import { usePostsStore } from '../stores/posts'
import { useAuthStore } from '../stores/auth'
import { useFollowsStore } from '../stores/follows'

const authStore = useAuthStore()
const { currentUser, getUsersForAccess } = storeToRefs(authStore)
const postsStore = usePostsStore()
const { getPostsByMyFollowing, selectedFilters, getPostsByFilter, posts } = storeToRefs(postsStore)
const filterStore = useFiltersStore()
const { filters } = storeToRefs(filterStore)
const followsStore = useFollowsStore()
const myFollowing = ref(false)

const setMyFollowing = (value) => {
    myFollowing.value = value
}

const modalState = reactive({
    add: false,
    edit: false,
    delete: false,
    addFilter: false,
    addComment: false
})

const form = reactive({
    title: '',
    text: '',
    subject: '',
    filterList: [],
    hidden: false,
    allowedUsers: [],
    askAccessUsers: []
})

const formFilter = reactive({
    name: ''
})

const formComment = reactive({
    text: ''
})

const selectedPost = ref(null)

const toggleModal = (key) => {
    modalState[key] = !modalState[key]
}

const submitAdd = () => {
    postsStore.addPost(form)
    toggleModal('add')
}

const submitFilter = () => {
    filterStore.addFilter(formFilter)
    toggleModal('addFilter')
}

const submitEdit = () => {
    postsStore.editPost(selectedPost.value.id, form)
    toggleModal('edit')
}

const submitDelete = () => {
    postsStore.deletePostById(selectedPost.value.id)
    toggleModal('delete')
}

const handleAdd = () => {
    form.title = ''
    form.text = ''
    form.subject = ''
    form.hidden = false
    form.filterList = []
    form.allowedUsers = []
    form.askAccessUsers = []

    toggleModal('add')
}

const handleAddFilter = () => {
    formFilter.name = ''

    toggleModal('addFilter')
}

const handleComment = (post) => {
    formComment.text = ''
    selectedPost.value = post

    toggleModal('addComment')
}

const submitComment = () => {
    postsStore.addCommentByPostId(selectedPost.value.id, formComment)

    toggleModal('addComment')
}

const handleEdit = (post) => {
    form.title = post.title
    form.text = post.text
    form.subject = post.subject
    form.filterList = post.filterList ? [...post.filterList] : []
    form.hidden = post.hidden
    form.allowedUsers = post.allowedUsers ? [...post.allowedUsers] : []
    form.askAccessUsers = post.askAccessUsers ? [...post.askAccessUsers] : []

    selectedPost.value = post

    toggleModal('edit')
}

const handleDelete = (post) => {
    selectedPost.value = post

    toggleModal('delete')
}

const handleFollow = (authorId) => {
    followsStore.followUser(authorId)
}

const handleUnfollow = (userId) => {
    followsStore.unfollowUser(userId)
}

const hasFollowing = (userId) => {
    const existedFollowing = followsStore.getFollowByFollowingId(userId)

    if (existedFollowing) {
        return true
    }

    return false
}

const onAccessHandler = (post) => {
    postsStore.editPost(post.id, {
        askAccessUsers: [
            ...post.askAccessUsers,
            {
                id: currentUser.value.id,
                name: currentUser.value.username
            }
        ]
    })
}

const onRemoveAskAccessUserHandler = (item) => {
    form.allowedUsers = [...form.allowedUsers, item]
}

const onSelectAllowedUsersHandler = (item) => {
    form.askAccessUsers = form.askAccessUsers.filter((user) => user.id !== item.id)
}

const onFilterHandler = (filter) => {
    postsStore.setFilters(filter)
}

const resetFilterHandler = (filterId) => {
    postsStore.resetFilterById(filterId)
}

const handleResetAllFilters = () => {
    postsStore.resetAllFilters()
}
</script>

<style scoped lang="scss">
.page {
    background-color: $gray-light;
    min-height: 90vh;
}

.posts-list {
    display: flex;
    flex-direction: column;
    gap: 24px;
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

.filter-list {
    display: flex;
    justify-content: flex-start;
    gap: 5px;

    &__item {
        background-color: $white;
        padding: 3px 5px;
        border-radius: 5px;
        color: $dark;
        display: flex;
        align-items: center;
        gap: 16px;

        svg {
            cursor: pointer;
            width: 18px;
            height: 18px;

            path {
                stroke: $gray;
            }
        }
    }
}
</style>
