<template>
    <div class="main-content">
        <div class="container-fluid">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    name: 'NoBgLayout'
}
</script>
<style scoped>
.main-content {
    min-height: 100vh;
    background-color: var(--v-primary-white);
}

.container-fluid {
    height: 100%;
    padding: 0 15px;
}
</style>