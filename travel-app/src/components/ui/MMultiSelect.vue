<template>
    <div class="select">
        <div :class="['select__header', { isOpen }]" @click="toggleSelect">
            <span v-if="modelValue.length === 0">{{ placeholder }}</span>
            <div v-else class="select__chips">
                <span v-for="item of modelValue" :key="item.id">
                    {{ item.name }}
                    <svg
                        @click.stop="removeItem(item)"
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
                </span>
            </div>
            <div class="select__toggle">
                <img src="@/assets/images/arrow-down.svg" alt="Down" />
            </div>
        </div>
        <div v-show="isOpen" class="select__content">
            <ul v-if="items.length > 0">
                <li v-for="item of items" :key="item.name" @click="selectItem(item)">
                    {{ item.name }}
                    <img
                        v-if="modelValue.some((el) => el.id === item.id)"
                        src="@/assets/images/check-icon-secondary.svg"
                        alt="Check"
                    />
                </li>
            </ul>

            <div v-else class="empty">Пока ничего нет</div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    modelValue: { type: Array, required: true },
    placeholder: { type: String, required: false, default: 'Выберите' },
    items: { type: Array, required: false, default: () => [] }
})

const emit = defineEmits(['update:modelValue', 'on-remove', 'on-select'])

const isOpen = ref(false)

const toggleSelect = () => {
    isOpen.value = !isOpen.value
}

const selectItem = (item) => {
    emit('on-select', item)

    if (props.modelValue.some((el) => el.id === item.id)) {
        removeItem(item)

        return
    }

    emit('update:modelValue', [...props.modelValue, item])
}

const removeItem = (item) => {
    emit('on-remove', item)

    const filteredItems = props.modelValue.filter((el) => el.id !== item.id)

    emit('update:modelValue', [...filteredItems])
}
</script>

<style scoped lang="scss">
.select {
    position: relative;

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        color: rgb(104, 104, 104);
        font-family: Arial, Helvetica, sans-serif;
        font-size: 14px;
        border: 1px solid rgba(92, 99, 112, 0.32);
        padding: 10px;
        border-radius: 8px;
        cursor: pointer;

        &:focus {
            outline: 1px solid #0828fe;
        }

        &.placeholder {
            color: rgb(144, 144, 144);
        }
        
        &.error {
            border: 1px solid $red;
        }

        img {
            transition: all 0.3s;
        }

        &.isOpen {
            img {
                transform: rotate(180deg);
            }
        }
    }

    &__content {
        position: absolute;
        left: 0;
        top: 99%;
        width: 100%;
        background-color: #fff;
        padding: 6px 0;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        border: 1px solid rgba(92, 99, 112, 0.32);
        border-radius: 8px;
        z-index: 2;

        ul {
            li {
                transition: all 0.3s;
                padding: 4px 8px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 8px;
                cursor: pointer;

                img {
                    width: 16px;
                    height: 16px;
                }

                &:hover {
                    background-color: #e1e1e1;
                }
            }
        }
    }

    &__chips {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        gap: 6px;

        span {
            border: 1px solid rgba(92, 99, 112, 0.32);
            padding: 2px 4px;
            border-radius: 4px;
            font-size: 12px;
            display: flex;
            align-items: center;
            gap: 2px;

            svg {
                width: 14px;
                height: 14px;

                path {
                    stroke: $gray;
                }
            }
        }
    }
    
    .empty {
        padding: 0 8px;
    }
}
</style>
