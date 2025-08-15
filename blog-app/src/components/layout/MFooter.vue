<template>
    <footer class="footer">
        <div class="container">
            <div class="footer__inner">
                <div class="logo">
                    <RouterLink to="/"> blog app </RouterLink>
                </div>
                <p class="copyrights">All rights reserved ©</p>
            </div>
        </div>
    </footer>
</template>

<style scoped lang="scss">
.footer {
    background-color: #242424;
    color: white;
    margin-top: auto;

    &__inner {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }

    &-menu {
        display: flex;
        flex-direction: row;
        gap: 30px;
    }
}
.logo {
    padding-top: 10px;
    a {
        font-size: 30px;
        line-height: 30px;
        color: white;
    }
}
</style>

<script setup></script>
