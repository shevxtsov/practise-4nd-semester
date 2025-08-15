<template>
    <header class="header">
        <div class="container">
            <div class="header__inner">
                <div class="logo">
                    <RouterLink :to="{ name: 'home' }"> books </RouterLink>
                </div>
                <MUserProfile color="transparent" />
            </div>
        </div>
    </header>
</template>

<script setup>
import MUserProfile from '../profile/MUserProfile.vue'
</script>

<style scoped lang="scss">
.header {
    background-color: #242424;

    &__inner {
        padding: 10px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}

.header-menu {
    display: flex;
    justify-content: center;
    gap: 20px;

    li {
        position: relative;

        a {
            font-size: 18px;
            position: relative;

            &.router-link-active {
                color: #bebebe;
            }
        }

        &.admin-menu {
            margin-left: 10px;

            &::before {
                content: '';
                position: absolute;
                left: -15px;
                bottom: 4px;
                width: 1px;
                height: 20px;
                background-color: #bebebe;
            }
        }
    }
}

.logo {
    a {
        font-size: 30px;
        line-height: 30px;
        color: #fff;
    }
}
</style>
