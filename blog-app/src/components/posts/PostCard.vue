<template>
    <div class="post-card">
        <div v-if="post.askAccessUsers.length > 0 && isAuthor" class="has-ask-access">
            Запрошен доступ
            <span class="badge">{{ post.askAccessUsers.length }}</span>
        </div>

        <template v-if="hasAccess">
            <h4 class="post-card__title">{{ post.title }}</h4>
            <p class="post-card__desc">{{ post.text }}</p>
            <div class="filter-list">
                <div
                    v-for="filter of post.filterList"
                    :key="filter.name"
                    class="filter-list__item"
                    @click="emit('on-filter', filter)"
                >
                    #{{ filter.name }}
                </div>
            </div>
        </template>

        <template v-else>
            <div class="hidden-content">
                <div class="hidden-content__label">
                    <img src="@/assets/images/lock-icon-gray.svg" alt="Профиль" />
                    <p>Контент скрыт</p>
                </div>

                <MButton v-if="hasWaitingAccess"> Ожидает доступ </MButton>
                <MButton v-else color="error" @click="emit('on-access')">
                    Запросить доступ
                </MButton>
            </div>
        </template>

        <div class="post-card__actions">
            <slot name="actions"></slot>
        </div>

        <template v-if="post.comments.length > 0">
            <hr />

            <div class="post-comments">
                <div v-for="comment of post.comments" :key="comment.text + 1" class="comment">
                    <div class="comment__text">{{ comment.text }}</div>

                    <div class="post-author">
                        <div class="post-author__image">
                            <img
                                :src="
                                    comment.author.image ||
                                    'https://icon-library.com/images/anonymous-icon-png/anonymous-icon-png-5.jpg'
                                "
                                :alt="comment.author.username"
                            />
                        </div>
                        <span class="post-author__text">
                            {{ comment.author.username }}
                        </span>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { computed } from 'vue'

import MButton from '@/components/ui/MButton.vue'

const props = defineProps({
    post: { type: Object, required: true },
    currentUser: { type: Object, required: true }
})

const emit = defineEmits(['on-access', 'on-filter'])

const isAuthor = computed(() => {
    if (props.post.author.id === props.currentUser?.id) {
        return true
    }

    return false
})

const hasAccess = computed(() => {
    if (props.post.author.id === props.currentUser?.id) {
        return true
    }

    if (!props.post.hidden) {
        return true
    }

    const hasInAllowedUsers = props.post.allowedUsers.find(
        (user) => user.id === props.currentUser?.id
    )

    if (hasInAllowedUsers) {
        return true
    }

    return false
})

const hasWaitingAccess = computed(() => {
    const existedUser = props.post.askAccessUsers.find((user) => user.id === props.currentUser?.id)

    if (existedUser) {
        return true
    }

    return false
})
</script>

<style scoped lang="scss">
.post-card {
    position: relative;
    background-color: #fff;
    border-radius: 12px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    &__title {
        font-weight: 500;
        font-size: 20px;
        line-height: 125%;
    }

    &__desc {
        color: $gray;
        font-size: 16px;
        line-height: 125%;
    }

    &__actions {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 12px;
        margin-top: auto;
    }

    .filter-list {
        display: flex;
        justify-content: flex-start;
        gap: 5px;

        &__item {
            background-color: $gray-light;
            padding: 3px 5px;
            border-radius: 5px;
            color: $dark;
            cursor: pointer;
        }
    }
}

.has-ask-access {
    position: absolute;
    top: 12px;
    right: 12px;
    background-color: $primary;
    color: $white;
    padding: 4px 8px;
    border-radius: 6px;

    .badge {
        background-color: $red;
        padding: 4px;
        border-radius: 50%;
        color: $white;
        position: absolute;
        right: -11px;
        top: -9px;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.hidden-content {
    &__label {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 8px;
    }
}

.post-author {
    margin-right: auto;
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;

    &__image {
        width: 24px;
        height: 24px;
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
        font-size: 14px;
    }
}

.post-comments {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.comment {
    background-color: $gray-light;
    border-radius: 8px;
    padding: 16px;

    &__text {
        padding: 12px;
    }
}
</style>
