<template>
    <input
        :type="type"
        :class="['input', color]"
        :placeholder="placeholder"
        :value="modelValue"
        @input="handleInput"
    />
</template>

<script setup>
defineProps({
    modelValue: { type: [String, Number], required: true },
    placeholder: { type: String, required: false, default: '' },
    color: { type: String, required: false, default: '' },
    type: { type: String, required: false, default: 'text' }
})

const emit = defineEmits(['update:modelValue'])

const handleInput = (e) => {
    const value = e.target.value

    emit('update:modelValue', value)
}
</script>

<style scoped lang="scss">
.input {
    display: inline-block;
    width: 100%;
    color: rgb(104, 104, 104);
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    border: 1px solid rgba(92, 99, 112, 0.32);
    padding: 10px;
    border-radius: 8px;

    &:focus {
        outline: 1px solid #0828fe;
    }

    &.placeholder {
        color: rgb(144, 144, 144);
    }
    &.error {
        border: 1px solid $red;
    }
}
</style>
