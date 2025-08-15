<template>
    <button :class="['btn', size, color, full ? 'full' : '']">
        <div v-if="loading" class="dots-container">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <!-- <div class="dot"></div>
            <div class="dot"></div> -->
        </div>
        <div v-else>
            <slot>Submit</slot>
        </div>
    </button>
</template>

<script setup>
defineProps({
    full: { type: Boolean, required: false, default: false },
    color: { type: String, required: false, default: '' },
    size: { type: String, required: false, default: 'medium' },
    loading: { type: Boolean, required: false, default: false }
})
</script>

<style scoped lang="scss">
.dots-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin-bottom: 5px;
}

.dot {
    height: 10px;
    width: 10px;
    margin-right: 10px;
    border-radius: 10px;
    background-color: #b3d4fc;
    animation: pulse 1.5s infinite ease-in-out;
}

.dot:last-child {
    margin-right: 0;
}

.dot:nth-child(1) {
    animation-delay: -0.3s;
}

.dot:nth-child(2) {
    animation-delay: -0.1s;
}

.dot:nth-child(3) {
    animation-delay: 0.1s;
}

@keyframes pulse {
    0% {
        transform: scale(0.8);
        background-color: #b3d4fc;
        box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
    }

    50% {
        transform: scale(1.2);
        background-color: #6793fb;
        box-shadow: 0 0 0 10px rgba(178, 212, 252, 0);
    }

    100% {
        transform: scale(0.8);
        background-color: #b3d4fc;
        box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
    }
}
.btn {
    display: block;
    border: 0;
    border-radius: 8px;
    padding: 11px 30px;
    font-size: 16px;
    line-height: 16px;
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
        background-color: $gray-hover;
    }

    &.big {
        padding: 16px 40px;
        font-size: 18px;
        line-height: 18px;
    }

    &.small {
        padding: 8px 20px;
        font-size: 12px;
        line-height: 12px;
    }

    &.primary {
        background-color: $primary;
        color: #fff;

        &:hover {
            background-color: $primary-hover;
        }
    }

    &.secondary {
        background-color: $purple;
        color: $white;

        &:hover {
            background-color: $purple-hover;
        }
    }

    &.success {
        background-color: $green;
        color: $white;

        &:hover {
            background-color: $green-hover;
        }
    }

    &.error {
        background-color: $red;
        color: $white;

        &:hover {
            background-color: $tomato;
        }
    }

    &.warning {
        background-color: $orange;
        color: $white;

        &:hover {
            background-color: $orange-hover;
        }
    }

    &.outline {
        border: 1px solid $orange;
        background-color: $white;
        color: $orange;

        &:hover {
            background-color: $orange;
            color: $white;
        }
    }

    &.transparent {
        color: $white;
        background-color: transparent;
        padding: 0;
        border-radius: 0;
    }

    &.full {
        width: 100%;
    }
}
</style>
