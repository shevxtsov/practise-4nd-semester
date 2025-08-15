<template>
    <div class="travel-card">
        <div class="travel-price">
            <template v-if="travel.price"> Цена: {{ travel.price }} руб. </template>

            <template v-else>Не указано</template>
        </div>

        <div class="travel-card__actions">
            <div class="travel-author">
                <div class="travel-author__image">
                    <img
                        :src="
                            travel.author.image ||
                            'https://icon-library.com/images/anonymous-icon-png/anonymous-icon-png-5.jpg'
                        "
                        :alt="travel.author.username"
                    />
                </div>
                <span class="travel-author__text">
                    {{ travel.author.username }}
                </span>
            </div>
        </div>

        <h4 class="travel-card__title">{{ travel.title }}</h4>
        <p class="travel-card__desc">{{ travel.text }}</p>

        <hr />

        <template v-if="travel.heritages?.length > 0">
            <h5 class="travel-card__subtitle">Места культурного наследия:</h5>

            <div class="travel-heritages">
                <div v-for="heritage of travel.heritages" :key="heritage.name + 1" class="heritage">
                    <div class="heritage__text">{{ heritage.name }}</div>
                    <div class="heritage__image">
                        <img
                            :src="
                                heritage.image ||
                                'https://icon-library.com/images/anonymous-icon-png/anonymous-icon-png-5.jpg'
                            "
                            :alt="heritage.name"
                        />
                    </div>

                    <a
                        v-if="heritage.link"
                        class="heritage__link"
                        :href="heritage.link"
                        target="_blank"
                    >
                        Подробнее
                    </a>
                </div>
            </div>
        </template>

        <template v-if="travel.places?.length > 0">
            <h5 class="travel-card__subtitle">Места для посещения:</h5>

            <div class="travel-places">
                <div v-for="place of travel.places" :key="place.name + 1" class="place">
                    <div class="place__desc">
                        <div class="place__name">{{ place.name }}</div>
                        <div class="place__text">{{ place.text }}</div>
                    </div>
                    <div class="place__image">
                        <img
                            :src="
                                place.image ||
                                'https://icon-library.com/images/anonymous-icon-png/anonymous-icon-png-5.jpg'
                            "
                            :alt="place.name"
                        />
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
defineProps({
    travel: { type: Object, required: true }
})
</script>

<style scoped lang="scss">
.travel-card {
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

    &__subtitle {
        font-weight: 500;
        font-style: italic;
        font-size: 18px;
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
}

.travel-heritages {
    display: grid;
    gap: 24px;
    grid-template-columns: repeat(4, 1fr);
}

.travel-places {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.heritage {
    background-color: $gray-light;
    border-radius: 8px;
    padding: 16px;

    &__text {
        margin-bottom: 8px;
    }

    &__image {
        height: 160px;
        width: 100%;
        overflow: hidden;
        border-radius: 8px;

        img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: all 0.3s;
        }

        &:hover {
            img {
                transform: scale(1.1);
            }
        }
    }

    &__link {
        display: block;
        color: $primary;
        margin-top: 8px;
        text-decoration: underline;

        &:hover {
            text-decoration: none;
        }
    }
}

.place {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: $gray-light;
    border-radius: 8px;
    padding: 16px;

    &__desc {
        max-width: 45%;
        flex: 0 0 45%;
    }

    &__name {
        font-weight: 600;
        font-size: 18px;
        margin-bottom: 8px;
    }

    &__text {
        margin-bottom: 8px;
    }

    &__image {
        height: 160px;
        width: 100%;
        overflow: hidden;
        border-radius: 8px;

        img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: all 0.3s;
        }

        &:hover {
            img {
                transform: scale(1.1);
            }
        }
    }

    &__link {
        display: block;
        color: $primary;
        margin-top: 8px;
        text-decoration: underline;

        &:hover {
            text-decoration: none;
        }
    }
}

.travel-price {
    position: absolute;
    top: 12px;
    right: 12px;
    background-color: $primary;
    color: $white;
    padding: 4px 8px;
    border-radius: 6px;
}

.travel-author {
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
</style>
