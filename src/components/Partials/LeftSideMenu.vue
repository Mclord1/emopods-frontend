<template>
    <!-- ========== Left Sidebar Start ========== -->
    <div class="left-side-menu" v-if="isMenuOpen">
        <div class="h-100 mt-30" data-simplebar>

            <div id="sidebar-menu">
                <ul id="side-menu">
                    <li>
                        <router-link :to="{ name: 'Dashboard' }" :class="{ 'active': isActive('Dashboard') }">
                            <i :class="isActive('Dashboard') ? 'mdi mdi-view-dashboard' : 'mdi mdi-view-dashboard-outline'"
                                alt="dashboard icon"></i>
                            <span>Dashboard</span>
                        </router-link>
                    </li>

                    <li>
                        <router-link :to="{ name: 'ListUsers' }"
                            :class="{ 'active': isActive('ListUsers') || isActive('ShowUsers') }">
                            <i :class="isActive('ListUsers') || isActive('ShowUsers') ? 'mdi mdi-account-group' : 'mdi mdi-account-group-outline'"
                                alt="users icon"></i>
                            <span>Users</span>
                        </router-link>
                    </li>

                    <li>
                        <a href="#appUsers" data-toggle="collapse"
                            :class="{ 'active': isActive('ListCustomers') || isActive('PendingVerification') }">
                            <i :class="isActive('ListCustomers') || isActive('PendingVerification') ? 'mdi mdi-account-multiple' : 'mdi mdi-account-multiple-outline'"
                                alt="app users icon"></i>
                            <span>App Users</span>
                        </a>
                        <div class="collapse" id="appUsers">
                            <ul class="nav-second-level">
                                <li>
                                    <router-link :to="{ name: 'ListCustomers' }"
                                        :class="{ 'active': isActive('ListCustomers') }">
                                        <span>All App Users</span>
                                    </router-link>
                                </li>
                                <li>
                                    <router-link :to="{ name: 'PendingVerification' }"
                                        :class="{ 'active': isActive('PendingVerification') }">
                                        <span>Pending Verification</span>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- End Sidebar -->

            <div class="clearfix"></div>
        </div>


    </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { ref, watch, watchEffect } from "vue";

export default {
    props: {
        isMobileMenuOpen: Boolean
    },
    setup(props) {
        const route = useRoute()
        const isMenuOpen = ref(props.isMobileMenuOpen);
        const currentRoute = ref(null)
        const isAccessDropdownOpen = ref(localStorage.getItem('isAccessDropdownOpen') === 'true' || false)

        watch(() => props.isMobileMenuOpen, (newValue) => {
            isMenuOpen.value = newValue
        })

        watchEffect(() => {
            currentRoute.value = route.name
        })

        const isActive = (routeName) => {
            return currentRoute.value.toLowerCase() === routeName.toLowerCase()
        }

        const toggleAccessDropdown = () => {
            isAccessDropdownOpen.value = !isAccessDropdownOpen.value
            localStorage.setItem('isAccessDropdownOpen', isAccessDropdownOpen.value.toString());
        }

        return {
            route,
            isMenuOpen,
            isActive,
            toggleAccessDropdown,
            isAccessDropdownOpen,
        }
    }
};
</script>

<style scoped>
.active {
    background-color: var(--v-primary-light-gray);
    border-radius: 10px;
    color: #000000 !important;
    font-weight: 500;
    margin: 0 2px;
}

@media (max-width: 991px) {
    .left-side-menu {
        display: block !important;
    }
}

li a {
    font-family: "Graphik Medium", sans-serif !important;
    color: #000000 !important;
    font-size: 14px !important;
}

li img {
    margin-right: 10px;
}

.nav-second-level a {
    font-family: "Graphik Regular", sans-serif !important;
}

.nav-second-level .active {
    border-radius: 0;
    color: #000000 !important;
    background-color: var(--v-primary-white);
    margin: 0;
}

.nav-second-level .active span {
    padding-bottom: 5px;
    border-bottom: 3px solid var(--v-primary-accent);
}

.menu-arrow {
    display: inline-block;
    margin-left: 6px;
    text-rendering: auto;
    line-height: 0;
    font-size: 18px;
    transform: translate(0, 0);
}

.menu-arrow:before {
    content: "\F0142";
}

#side-menu .collapse.show {
    background: var(--v-primary-white);
}
</style>