<template>
    <div class="select">
        <div :class="['select__header', { isOpen }]" @click="toggleSelect">
            <span>{{ modelValue?.name || placeholder }}</span>
            <img src="@/assets/images/arrow-down.svg" alt="Down" />
        </div>
        <div v-show="isOpen" class="select__content">
            <ul>
                <li v-for="item of items" :key="item.name" @click="select(item)">
                    {{ item.name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
    modelValue: { type: Object, required: true },
    placeholder: { type: String, required: false, default: 'Выберите' },
    items: { type: Array, required: false, default: () => [] }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)

const toggleSelect = () => {
    isOpen.value = !isOpen.value
}

const select = (item) => {
    isOpen.value = false

    emit('update:modelValue', item)
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
                cursor: pointer;

                &:hover {
                    background-color: #e1e1e1;
                }
            }
        }
    }
}
</style>
