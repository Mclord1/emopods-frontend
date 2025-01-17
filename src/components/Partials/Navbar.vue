<template>
    <!-- Topbar Start -->
    <div class="navbar-custom">
        <div class="container-fluid">
            <ul class="list-unstyled topnav-menu float-right mb-0">
                <li class="dropdown notification-list topbar-dropdown">
                    <a class="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" data-toggle="dropdown"
                       href="#" aria-haspopup="false" aria-expanded="false">
                        <div class="avatar-md m-0">
                            <span
                                :class="`avatar-title bg-dark text-white rounded-circle`">
                                {{ userInitials }}
                            </span>
                        </div>

                        <span class="pro-user-name ml-1">
                            <i class="mdi mdi-chevron-down"></i>
                        </span>
                    </a>

                    <div class="dropdown-menu dropdown-menu-right profile-dropdown">
                        <!-- item-->
                        <div class="dropdown-header noti-title">
                            <h6 class="text-overflow m-0">Welcome {{ userName }}!</h6>
                        </div>

                        <!-- item-->

                        <div class="dropdown-divider"></div>

                        <!-- item-->
                        <a href="javascript:void(0);" class="dropdown-item notify-item" @click="handleLogout">
                            <i class="fe-log-out mr-10"></i>
                            <span>Logout</span>
                        </a>
                    </div>
                </li>
            </ul>

            <ul class="list-unstyled topnav-menu topnav-menu-left m-0">
                <li>
                    <button class="button-menu-mobile waves-effect waves-light" @click="handleButtonClick">
                        <i class="fe-menu"></i>
                    </button>
                </li>
            </ul>

            <div class="logo-box d-flex align-items-center">
                <a href="/" class="logo logo-dark mr-2">
                    <span class="logo-sm">
                        <img src="/logo.png" alt="" height="70" width="70" class="logoLg"/>
                    </span>
                    <span class="logo-lg">
                        <img src="/logo.png" class="logoLg" alt="" height="70" width="70"/>
                    </span>
                </a>
                <h3 class="medium">
                    EMOPODS
                </h3>
            </div>
        </div>

        <div class="linear-loader" v-if="loading">
            <div class="train"></div>
        </div>
    </div>

</template>

<script>
import {onMounted, ref, watchEffect} from "vue";
import {useRouter} from "vue-router";
import {useUserStore} from "@/store/user";
import {capitalizeFirstLetter, getUserInitials} from "@/utils/helpers";
import {useAuthStore} from "@/store/authStore";

export default {
    props: {
        loading: Boolean,
        displaySearch: Boolean
    },
    setup(props, {emit}) {
        const router = useRouter()
        const userName = ref('')
        const userStore = useUserStore()
        const userInitials = ref('')
        const loading = ref(true)

        onMounted(async () => {
            userInitials.value = getUserInitials(userStore.user.first_name, userStore.user.last_name)
            userName.value = capitalizeFirstLetter(userStore.user.first_name, userStore.user.last_name)
        })

        const handleLogout = () => {
            // Get all cookies
            const cookies = document.cookie.split(';');

            // Loop through cookies and remove each one
            cookies.forEach(cookie => {
                const cookieParts = cookie.split('=');
                const cookieName = cookieParts[0].trim();
                document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            });

            localStorage.clear()

            const authStore = useAuthStore()
            authStore.setAccessToken(null)

            router.push({name: 'Login'})
        }

        watchEffect(() => {
            loading.value = props.loading;
        });

        const handleButtonClick = () => {
            emit('toggle-menu')
        }

        return {
            loading,
            handleLogout,
            userName,
            userInitials,
            handleButtonClick,
        }
    }
};
</script>

<style scoped>
.navbar-custom {
    border-bottom: 1px solid var(--border-color);
    padding: 0;
}

.logoLg {
    margin-left: 20px;
}

.nav-user {
    display: flex !important;
    align-items: center;
}

.back-icon > img {
    cursor: pointer;
}

.linear-loader {
    height: 8px; /* Adjust the height as needed */
    background-color: #89a6f3; /* Adjust the color as needed */
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    /* animation: moveRight 1s linear infinite; Adjust the animation speed as needed */
}

.train {
    width: 900px; /* Adjust the train's width */
    height: 8px; /* Should match the height of the loader */
    background-color: #2f5bcf; /* Adjust the color as needed */
    position: absolute;
    animation: moveRight 1s linear infinite; /* Adjust the animation speed as needed */
    top: 0;
    left: 0;
}

@keyframes moveRight {
    0% {
        left: -50px; /* Start off the screen to the left */
    }
    100% {
        left: 100%; /* Move to the right of the screen */
    }
}

.button-menu-mobile {
    display: none; /* Hide the button by default */
}

/* Media query to show the button on screens with a maximum width of 767px */
@media (max-width: 767px) {
    .button-menu-mobile {
        display: block; /* Show the button on smaller screens */
    }

    .topbar-dropdown {
        padding-top: 12px;
    }
}

@media (max-width: 992px) {
    .button-menu-mobile {
        display: block; /* Show the button on smaller screens */
    }
}

.topnav-menu {
    margin: 0 15px !important;
}

.avatar-md {
    height: 44px;
    width: 44px;
    margin-right: 10px !important;
}

.nav-link {
    color: #333 !important;
}
</style>