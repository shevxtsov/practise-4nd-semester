<template>
    <div class="modal" v-if="modelValue">
        <div class="overlay"></div>
        <div class="modal-box">
            <div class="modal-close">
                <MButton color="transparent" @click="onClose">
                    <img src="@//assets/images/close-icon.svg" alt="close">
                </MButton>
            </div>
            <div class="modal-box__content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import MButton from './MButton.vue'

defineProps({
    modelValue: { type: Boolean, required: true }
})

const emit = defineEmits(['update:modelValue'])

const onClose = () => {
    emit('update:modelValue', false)
}
</script>

<style scoped lang="scss">
.overlay {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #adadad12;
    z-index: 99;
    backdrop-filter: blur(2px);
    overflow: hidden;
}

.modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    overflow-y: auto;
}

.modal-close {
    display: flex;
    justify-content: flex-end;
}

.modal-box {
    position: relative;
    background: #fff;
    border-radius: 6px;
    padding: 24px;
    padding-top: 12px;
    max-width: 320px;
    width: 100%;
    z-index: 999;

    &__content {
        padding-top: 20px;
    }
}
</style>
