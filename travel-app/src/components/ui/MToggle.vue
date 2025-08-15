<template>
    <div class="toggle">
        <label class="switch">
            <input type="checkbox" :checked="modelValue" @change="onChange" />
            <span class="slider"></span>
        </label>
        <span v-if="label" class="toggle__title">{{ label }}</span>
    </div>
</template>

<script setup>
defineProps({
    label: { type: String, required: false, default: '' },
    modelValue: { type: Boolean, required: true }
})

const emit = defineEmits(['update:modelValue'])

const onChange = (event) => {
    emit('update:modelValue', event.target.checked)
}
</script>

<style scoped>
.toggle{
    display: flex;
    align-items: center;
    gap: 12px;
    justify-content: flex-end;
    flex-direction: row-reverse;
}
.switch {
    font-size: 17px;
    position: relative;
    display: inline-block;
    width: 62px;
    height: 35px;
}

/* Hide default HTML checkbox */
.switch input {
    opacity: 1;
    width: 0;
    height: 0;
}

/* The slider */
.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0px;
    background: #fff;
    transition: 0.4s;
    border-radius: 30px;
    border: 1px solid #ccc;
}

.slider:before {
    position: absolute;
    content: '';
    height: 1.9em;
    width: 1.9em;
    border-radius: 16px;
    left: 1.2px;
    top: 0;
    bottom: 0;
    background-color: white;
    box-shadow: 0 2px 5px #999999;
    transition: 0.4s;
}

input:checked + .slider {
    background-color: #5fdd54;
    border: 1px solid transparent;
}

input:checked + .slider:before {
    transform: translateX(1.5em);
}
</style>
