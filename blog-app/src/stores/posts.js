import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import { useFollowsStore } from './follows'

export const usePostsStore = defineStore(
    'posts',
    () => {
        const authStore = useAuthStore()
        const followsStore = useFollowsStore()

        const posts = ref([
            {
                id: 1,
                title: 'Test 1',
                subject: 'subject 1',
                text: 'Text about something...',
                author: {
                    id: 1,
                    username: 'admin',
                    image: 'https://cdn-icons-png.flaticon.com/512/6063/6063734.png'
                },
                filterList: [
                    {
                        id: 1,
                        name: 'природа'
                    }
                ],
                hidden: false,
                allowedUsers: [],
                askAccessUsers: [],
                comments: [
                    {
                        text: 'something',
                        author: {
                            id: 4,
                            username: 'Adel',
                            image: 'https://cdn-icons-png.flaticon.com/512/6063/6063734.png'
                        }
                    },
                    {
                        text: 'cool',
                        author: {
                            id: 2,
                            username: 'test',
                            image: 'https://cdn-icons-png.flaticon.com/512/6063/6063734.png'
                        }
                    }
                ]
            }
        ])
        const selectedFilters = ref([])

        const setFilters = (filter) => {
            selectedFilters.value = [...selectedFilters.value, filter]
        }

        const resetFilterById = (filterId) => {
            selectedFilters.value = selectedFilters.value.filter((filter) => filter.id !== filterId)
        }

        const resetAllFilters = () => {
            selectedFilters.value = []
        }

        const addPost = (newPost) => {
            const fullNewPost = {
                ...newPost,
                id: posts.value.length + 1,
                title: newPost.title || 'Без названия',
                author: authStore.currentUser,
                comments: []
            }

            posts.value = [...posts.value, fullNewPost]
        }

        const editPost = (postId, editablePost) => {
            const existedPost = getPostById(postId)

            if (!existedPost) {
                return
            }

            posts.value = posts.value.map((post) => {
                if (post.id === postId) {
                    return {
                        ...post,
                        ...editablePost
                    }
                }

                return post
            })
        }

        const getPostById = (postId) => {
            return posts.value.find((post) => post.id === postId)
        }

        const deletePostById = (postId) => {
            posts.value = posts.value.filter((post) => post.id !== postId)
        }

        const addCommentByPostId = (postId, formComment) => {
            const foundPost = getPostById(postId)

            if (!foundPost) {
                console.error('Записи не существует')
                return
            }

            posts.value = posts.value.map((post) => {
                if (post.id === postId) {
                    return {
                        ...post,
                        comments: [
                            ...post.comments,
                            {
                                ...formComment,
                                author: {
                                    id: authStore.currentUser.id,
                                    username: authStore.currentUser.username,
                                    image: authStore.currentUser.image
                                }
                            }
                        ]
                    }
                }

                return post
            })
        }

        const getPostsByMyFollowing = computed(() => {
            return posts.value.filter(
                (post) =>
                    post.author.id ===
                    followsStore.getFollowByFollowingId(post.author.id)?.followingId
            )
        })

        const getPostsByFilter = computed(() => {
            const filteredPosts = []

            for (const post of posts.value) {
                for (const postFilter of post.filterList) {
                    const foundFilter = selectedFilters.value.find(
                        (filter) => filter.id === postFilter.id
                    )

                    if (foundFilter) {
                        filteredPosts.push(post)
                    }
                }
            }

            return filteredPosts
        })

        return {
            posts,
            selectedFilters,
            addPost,
            editPost,
            getPostById,
            deletePostById,
            getPostsByMyFollowing,
            getPostsByFilter,
            setFilters,
            resetFilterById,
            resetAllFilters,
            addCommentByPostId
        }
    },
    {
        persist: {
            paths: ['posts']
        }
    }
)
