<template>
    <!-- Begin page -->
    <div id="wrapper">

        <Navbar :loading="loading" @toggle-menu="toggleMenu" />

        <LeftSideMenu :isMobileMenuOpen="mobileMenuStatus" />

        <!-- ============================================================== -->
        <!-- Start Page Content here -->
        <!-- ============================================================== -->

        <div class="content-page">
            <div class="content">
                <!-- Start Content-->
                <div class="master-container">
                    <FlashMessage :showAlert="showAlert" :alertType="alertType" :alertMessage="alertMessage"
                        class="mt-10" />
                    <router-view @data-loaded="closeLoader" @show-loader="showLoader" @flash-message="showMessage" />
                </div>
            </div>
        </div>

        <!-- ============================================================== -->
        <!-- End Page content -->
        <!-- ============================================================== -->
    </div>
    <!-- END wrapper -->
</template>

<script>
import { ref } from "vue";
import FlashMessage from '@/components/FlashMessage.vue'
import Loader from "@/views/General/Loader.vue";
import LeftSideMenu from "@/components/Partials/LeftSideMenu.vue";
import Navbar from "@/components/Partials/Navbar.vue";


export default {
    emits: ['showLoader', 'flashMessage', 'data-loaded'],
    components: { Navbar, LeftSideMenu, Loader, FlashMessage },
    setup() {
        const loading = ref(false)
        const alertType = ref("")
        const alertMessage = ref("")
        const showAlert = ref(false);
        const mobileMenuStatus = ref(true);

        const showMessage = (item) => {
            alertType.value = item.alertType
            alertMessage.value = item.alertMessage
            showAlert.value = true

            setTimeout(() => {
                showAlert.value = false;
            }, item.duration ?? 7000);
        }

        const showLoader = () => {
            loading.value = true
        }
        const closeLoader = () => {
            loading.value = false
        }

        const toggleMenu = () => {
            mobileMenuStatus.value = !mobileMenuStatus.value
        }

        return {
            closeLoader,
            loading,
            showLoader,
            showAlert,
            alertType,
            alertMessage,
            showMessage,
            mobileMenuStatus,
            toggleMenu,
        }
    }
};
</script>
<style scoped>
.container-fluid {
    overflow: auto;
    height: 90vh;
}
</style>