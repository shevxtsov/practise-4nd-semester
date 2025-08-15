<template>
    <div class="book-card">
        <div v-if="!book.in_stock" class="out-of-stock">Нет в наличии</div>
        <div v-if="book.end" class="rent-date">Аренда до: {{ book.end }}</div>

        <div class="book-card__image">
            <img
                :src="
                    book.image ||
                    'https://icon-library.com/images/anonymous-icon-png/anonymous-icon-png-5.jpg'
                "
                :alt="book.title"
            />
        </div>

        <div class="book-card__info">
            <h4 class="book-card__title">
                {{ book.title }}
                <span>{{ book.author.name }}</span>
            </h4>

            <div class="book-card__year">{{ book.year }}</div>
        </div>

        <div class="category-list">
            <div class="category-list__item">
                {{ book.category.name }}
            </div>
        </div>

        <div class="book-card__footer">
            <div class="book-card__price">{{ book.price }} руб.</div>

            <div class="book-card__actions">
                <slot name="actions"></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    book: { type: Object, required: true }
})
</script>

<style scoped lang="scss">
.book-card {
    position: relative;
    background-color: #fff;
    border-radius: 12px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;

    &__image {
        height: 270px;
        width: 100%;
        overflow: hidden;
        border-radius: 8px;

        img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &__info {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
    }

    &__title {
        font-weight: 600;
        font-size: 18px;
        line-height: 125%;

        span {
            display: block;
            font-size: 16px;
        }
    }

    &__actions {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 12px;
    }

    &__price {
        border-radius: 8px;
        padding: 4px 12px;
        background-color: $orange;
        color: #fff;
        max-width: 150px;
        text-align: center;
    }

    &__footer {
        display: flex;
        justify-content: space-between;
    }

    .category-list {
        display: flex;
        justify-content: flex-start;
        gap: 5px;

        &__item {
            background-color: $gray-light;
            padding: 3px 7px;
            border-radius: 5px;
            color: $dark;
        }
    }
}

.out-of-stock {
    position: absolute;
    top: 6px;
    right: 6px;
    border-radius: 12px;
    padding: 4px 12px;
    background-color: $red;
    color: #fff;
    max-width: 150px;
    text-align: center;
}

.rent-date {
    position: absolute;
    top: 6px;
    left: 6px;
    border-radius: 12px;
    padding: 4px 12px;
    background-color: $primary;
    color: #fff;
    max-width: 115px;
    text-align: center;
}
</style>
