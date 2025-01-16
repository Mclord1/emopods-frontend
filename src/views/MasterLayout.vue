<template>
    <Navbar />

    <div class="main-content">
        <div class="container container-fluid">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import Navbar from '@/components/Partials/Navbar.vue';

export default {
    components: {
        Navbar
    }

}
</script>
<style></style>