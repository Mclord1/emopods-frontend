<template>
    <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6 col-xl-5">
            <div class="card">
                <div class="card-body p-4">
                    <div class="text-center">
                        <div class="auth-logo">
                            <a href="#" class="logo logo-dark text-center">
                                <span class="logo-lg">
                                    <img src="@/assets/logo.png" alt="" height="87">
                                </span>
                            </a>

                            <a href="#" class="logo logo-light text-center">
                                <span class="logo-lg">
                                    <img src="@/assets/logo.png" alt="" height="87">
                                </span>
                            </a>

                            <h3 class="medium mt-3">EMOPODS</h3>
                        </div>
                    </div>

                    <p class="header medium">Sign in to your account</p>

                    <form @submit.prevent="submitForm">
                        <div class="form-group mb-3">
                            <TextInputField :config="{
                                inputFieldType: 'email',
                            }" labelText="Email" v-model="email" isRequired :errorMessage="emailError" />
                        </div>

                        <div class="form-group mb-3">
                            <TextInputField :config="{
                                inputFieldType: 'password',
                            }" labelText="Password" v-model="password" :isRequired="true"
                                :errorMessage="passwordError" />
                        </div>

                        <div class="form-group mb-0 text-center">
                            <RegularButtonBlock buttonText="Sign In" class="custom-button" buttonType="submit"
                                :loading="loading" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <AlertModal :isAlertModalOpen="isAlertModalOpen" @closeAlertModal="closeAlertModal" buttonText="Okay"
        @itemClicked="closeAlertModal" :alertModalHeader="alertModalHeader" :alertModalBody="alertModalBody" />
</template>

<script>
import { useRouter } from "vue-router"
import TextInputField from "@/components/TextInputField.vue";
import { ref } from "vue";
import RegularButton from "@/components/RegularButton.vue";
import RegularButtonBlock from "@/components/RegularButtonBlock.vue";
import { API_BASE_URL } from "@/config";
import { useUserStore } from "@/store/user";
import AlertModal from "@/components/AlertModal.vue";
import { useAuthStore } from "@/store/authStore";

export default {
    components: { AlertModal, RegularButtonBlock, RegularButton, TextInputField },
    setup() {
        document.title = 'Emopods Login'

        const email = ref('')
        const emailError = ref('')
        const password = ref('')
        const passwordError = ref('')
        const route = useRouter()
        const loading = ref(false)
        const isAlertModalOpen = ref(false)
        const alertModalHeader = ref('')
        const alertModalBody = ref('')

        const openAlertModal = () => {
            isAlertModalOpen.value = true;
        };

        const closeAlertModal = async () => {
            isAlertModalOpen.value = false;

            alertModalHeader.value = ''
            alertModalBody.value = ''
        };


        const validateForm = () => {
            let isValid = true

            emailError.value = ''
            passwordError.value = ''

            if (email.value.length === 0) {
                emailError.value = 'Enter a valid email address'
                isValid = false
            }

            if (password.value.length === 0) {
                passwordError.value = 'Enter a valid password'
                isValid = false
            }

            return isValid
        }

        const submitForm = async () => {
            if (validateForm()) {
                try {
                    loading.value = true;

                    const credentials = {
                        email: email.value,
                        password: password.value
                    }

                    const apiUrl = `${API_BASE_URL}/admin/login`;
                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(credentials)
                    });

                    const result = await response.json();

                    if (response.ok) {
                        const expirationDate = new Date();
                        expirationDate.setDate(expirationDate.getDate() + 7); // Cookie expires in 7 days

                        document.cookie = `uid=${result.data.accessToken}; path=/; expires=${expirationDate.toUTCString()}; SameSite=Strict`;

                        const authStore = useAuthStore()
                        authStore.setAccessToken(result.data.accessToken)

                        const userStore = useUserStore()
                        if (result.data.admin) {
                            userStore.setUserDetails(result.data.admin)
                        }

                        await route.push({ name: 'Dashboard' });
                    } else {
                        console.error('error result', result.message);
                        alertModalHeader.value = "Error"
                        alertModalBody.value = result.message

                        openAlertModal()
                    }
                } catch (error) {
                    console.error("An error occurred:", error);
                    alertModalHeader.value = "An error occurred"
                    alertModalBody.value = error

                    openAlertModal()
                } finally {
                    loading.value = false;
                }
            }
        }

        return {
            email,
            emailError,
            password,
            passwordError,
            submitForm,
            loading,
            isAlertModalOpen,
            alertModalHeader,
            alertModalBody,
            openAlertModal,
            closeAlertModal
        }
    }
}
</script>

<style scoped>
.card {
    box-shadow: none;
    margin-bottom: 24px;
    width: 100%;
}

.auth-logo {
    margin-bottom: 64px;
}

.header {
    font-size: 16px;
    color: var(--v-primary-text-dark);
    margin-bottom: 24px;
}
</style>