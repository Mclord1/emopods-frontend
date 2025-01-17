<template>
    <div class="form-content">
        <form>
            <div class="form-item mb-16">
                <TextInputField :config="{
                    class: 'form-control',
                    inputFieldType: 'text'
                }" labelText="First Name" :errorMessage="firstNameError" v-model="first_name" isRequired />
            </div>

            <div class="form-item mb-16">
                <TextInputField :config="{
                    class: 'form-control',
                    inputFieldType: 'text'
                }" labelText="Last Name" :errorMessage="lastNameError" v-model="last_name" isRequired />
            </div>

            <div class="form-item mb-16">
                <TextInputField :config="{
                    class: 'form-control',
                    inputFieldType: 'email'
                }" labelText="Email" :errorMessage="emailError" v-model="email" isRequired />
            </div>

            <div class="form-item mb-16">
                <TextInputField :config="{
                    class: 'form-control',
                    inputFieldType: 'password'
                }" labelText="Password" :errorMessage="passwordError" v-model="password" isRequired />
            </div>

            <div class="form-item mb-16">
                <SingleSelectField labelText="Role" :options="roleOptions" v-model="role" selectId="roleOptions"
                    :isRequired="true" :errorMessage="roleError" />
            </div>
        </form>
    </div>
</template>

<script>
import TextInputField from "@/components/TextInputField.vue";
import SingleSelectField from "@/components/SingleSelectField.vue";
import { ref, watch } from "vue";
import { API_BASE_URL } from "@/config";
import { useAuthStore } from "@/store/authStore";

export default {
    props: {
        saveItemClicked: Boolean
    },
    components: { SingleSelectField, TextInputField },
    emits: ['closeFormModal', 'actionLoading'],
    setup(props, { emit }) {
        const first_name = ref("");
        const last_name = ref("");
        const email = ref("");
        const password = ref("");
        const role = ref("admin");

        const firstNameError = ref("");
        const lastNameError = ref("");
        const emailError = ref("");
        const passwordError = ref("");
        const roleError = ref("");

        const roleOptions = ref([
            { label: 'Admin', value: 'admin' },
            { label: 'Super Admin', value: 'super_admin' },
            { label: 'Operations', value: 'operations' }
        ]);

        watch(() => props.saveItemClicked, () => {
            saveNewItem();
        });

        const validateForm = () => {
            let isValid = true;

            firstNameError.value = '';
            lastNameError.value = '';
            emailError.value = '';
            passwordError.value = '';
            roleError.value = '';

            if (!first_name.value) {
                firstNameError.value = 'First name is required';
                isValid = false;
            }

            if (!last_name.value) {
                lastNameError.value = 'Last name is required';
                isValid = false;
            }

            if (!email.value) {
                emailError.value = 'Email is required';
                isValid = false;
            } else if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                emailError.value = 'Please enter a valid email address';
                isValid = false;
            }

            if (!password.value) {
                passwordError.value = 'Password is required';
                isValid = false;
            }

            if (!role.value) {
                roleError.value = 'Role is required';
                isValid = false;
            }

            return isValid;
        };

        const saveNewItem = async () => {
            if (validateForm()) {
                try {
                    emit('actionLoading', true);

                    const data = {
                        first_name: first_name.value,
                        last_name: last_name.value,
                        email: email.value,
                        password: password.value,
                        role: role.value
                    };

                    const authStore = useAuthStore();
                    await authStore.checkAuthentication();
                    const accessToken = authStore.getAccessToken;

                    const apiUrl = `${API_BASE_URL}/admin/user`;
                    const response = await fetch(apiUrl, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${accessToken}`,
                        },
                        body: JSON.stringify(data),
                    });

                    const result = await response.json();

                    if (response.ok && result.status === "success") {
                        emit("closeFormModal", {
                            header: "Admin user created successfully",
                            body: "The admin user has been added to the system.",
                            type: "success",
                        });
                    } else {
                        emit("closeFormModal", {
                            header: "Error",
                            body: result.message || "An error occurred while creating the admin user.",
                            type: "error",
                        });
                    }
                } catch (error) {
                    console.error("An error occurred:", error);
                    emit("closeFormModal", {
                        header: "Error",
                        body: "An unexpected error occurred. Please try again.",
                        type: "error",
                    });
                } finally {
                    emit('actionLoading', false);
                }
            }
        };

        return {
            first_name,
            last_name,
            email,
            password,
            role,
            firstNameError,
            lastNameError,
            emailError,
            passwordError,
            roleError,
            roleOptions
        };
    }
};
</script>

<style scoped>
.form-content {
    padding: 20px 0;
}

.form-item {
    margin-bottom: 1rem;
}
</style>
