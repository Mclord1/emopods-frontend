<template>
    <div class="row">
        <div class="col-12">
            <div class="page-title-box">
                <div class="page-title-right">
                    <RegularButton buttonText="Add Admin" class="custom-button medium" @clicked="openFormModal" />
                </div>
                <h4 class="page-title">Admin Users</h4>
            </div>
        </div>
    </div>

    <div class="row mainContent">
        <div class="col-sm-12">
            <TableView :data="formattedAdminsData" :headers="tableHeaders" :id="idForActions"
                :detailsData="getDataForDetailsView" :showSearchField="true"
                :searchStringFromParent.sync="searchStringFromChild" :viewAction="viewAction" :loading="adminLoader"
                :showActionsColumn="true" :searchFields="searchFields" :deleteAction="openDeleteConfirmationModal"
                :totalPages="totalPages" :currentPage.sync="currentPage" :changePage="changePage"
                :itemsPerPage="itemsPerPage" :changeItemsPerPage="changeItemsPerPage" />
        </div>
    </div>

    <AlertModal :isAlertModalOpen="isAlertModalOpen" @closeAlertModal="closeAlertModal" buttonText="Okay"
        @itemClicked="closeAlertModal" :alertModalHeader="alertModalHeader" :alertModalBody="alertModalBody" />

    <FormModal :isFormModalOpen="isFormModalOpen" @closeFormModal="closeFormModal" modalHeader="Add Admin User"
        saveButtonText="Create" :buttonLoader="actionLoader" @saveItemClicked="saveButtonIsClicked">
        <CreateUser @closeFormModal="closeFormModal" @actionLoading="updateButtonLoader"
            :saveItemClicked="isSaveButtonClicked" />
    </FormModal>

    <ConfirmationModal :isConfirmationModalOpen="isDeleteModalOpen" @closeConfirmationModal="closeConfirmationModal"
        buttonText="Delete" :buttonLoader="actionButtonLoader" @itemClicked="deleteAction"
        :confirmationModalHeader="confirmationModalHeader" :confirmationModalBody="confirmationModalBody" />
</template>

<script>
import { computed, onMounted, ref, watch } from "vue";
import RegularButton from "@/components/RegularButton.vue";
import TableView from "@/components/TableView.vue";
import { useRouter } from "vue-router";
import AlertModal from "@/components/AlertModal.vue";
import ConfirmationModal from "@/components/ConfirmationModal.vue";
import getAdminUsers from "@/composables/getAdminUsers";
import { API_BASE_URL } from "@/config";
import { getValidToken } from "@/utils/helpers";
import { useAuthStore } from "@/store/authStore";
import FormModal from "@/components/FormModal.vue";
import CreateUser from "./CreateUser.vue";

export default {
    emits: ['showLoader', 'flashMessage', 'data-loaded'],
    components: {
        ConfirmationModal,
        AlertModal,
        TableView,
        RegularButton,
        FormModal,
        CreateUser
    },
    setup() {
        document.title = 'Admin Users';
        const router = useRouter();
        const {
            fetchAdminsData,
            adminsList,
            adminsPayload,
            formattedAdminsData,
            adminLoader
        } = getAdminUsers();

        const itemsPerPage = ref(10);
        const totalPages = ref(0);
        const currentPage = ref(1);
        const actionButtonLoader = ref(false);
        const isAlertModalOpen = ref(false);
        const alertModalHeader = ref('');
        const alertModalBody = ref('');
        const isDeleteModalOpen = ref(false);
        const confirmationModalHeader = ref('');
        const confirmationModalBody = ref('');
        const itemId = ref(0);
        const isFormModalOpen = ref(false);
        const isSaveButtonClicked = ref(false);
        const actionLoader = ref(false);
        const isHandlingError = ref(false);

        onMounted(() => {
            fetchAdminsData(1, itemsPerPage.value);
        });

        watch(adminsPayload, () => {
            if (adminsPayload.value) {
                totalPages.value = adminsPayload.value.pagination.total_pages;
                currentPage.value = adminsPayload.value.pagination.current_page;
            }
        });

        const tableHeaders = computed(() => {
            return [
                { label: "Name", key: "name" },
                { label: "Email", key: "email" },
                { label: "Role", key: "role" },
                { label: "Status", key: "status" },
                { label: "Created At", key: "created_at" }
            ];
        });

        const searchStringFromChild = ref("");
        const searchFields = ['name', 'email', 'role', 'status', 'created_at'];

        const idForActions = computed(() => adminsList.value.map(item => item.id));
        const getDataForDetailsView = computed(() => adminsList.value);

        const viewAction = (item, id) => {
            router.push({
                name: 'ShowUser',
                params: { id }
            });
        };

        const openFormModal = () => {
            isFormModalOpen.value = true;
        };

        const closeFormModal = (result) => {
            if (result) {
                isHandlingError.value = true;
                alertModalHeader.value = result.header;
                alertModalBody.value = result.body;
                isAlertModalOpen.value = true;
                if (result.type === 'success') {
                    isFormModalOpen.value = false;
                    fetchAdminsData(currentPage.value, itemsPerPage.value);
                }
                isHandlingError.value = false;
            } else if (!isHandlingError.value) {
                isFormModalOpen.value = false;
            }
            isSaveButtonClicked.value = false;
        };

        const saveButtonIsClicked = () => {
            console.log('saveButtonIsClicked');
            isSaveButtonClicked.value = true;
        };

        const updateButtonLoader = (loading) => {
            actionLoader.value = loading;
        };

        const editAction = (item, id) => {
            // Implement edit functionality
            console.log('Edit user:', id);
        };

        const openDeleteConfirmationModal = (admin, id) => {
            itemId.value = id;
            confirmationModalHeader.value = 'Delete Admin User?';
            confirmationModalBody.value = "This action cannot be reversed, are you sure you want to continue?";
            isDeleteModalOpen.value = true;
        };

        const closeConfirmationModal = () => {
            isDeleteModalOpen.value = false;
        };

        const closeAlertModal = async () => {
            isAlertModalOpen.value = false;
            alertModalHeader.value = '';
            alertModalBody.value = '';
            await fetchAdminsData(currentPage.value, itemsPerPage.value);
        };

        const deleteAction = async () => {
            try {
                actionButtonLoader.value = true;
                const authStore = useAuthStore();
                await authStore.checkAuthentication();
                const accessToken = getValidToken();

                const response = await fetch(`${API_BASE_URL}/admin/user/${itemId.value}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                const result = await response.json();

                if (response.ok && result.status === "success") {
                    isDeleteModalOpen.value = false;
                    alertModalHeader.value = "Admin user deleted successfully";
                    alertModalBody.value = result.message || '';
                    isAlertModalOpen.value = true;
                    await fetchAdminsData(currentPage.value, itemsPerPage.value);
                } else {
                    alertModalHeader.value = "Error";
                    alertModalBody.value = result.message || "An error occurred while deleting the admin user.";
                    isAlertModalOpen.value = true;
                }
            } catch (error) {
                console.error("An error occurred:", error);
                alertModalHeader.value = "Error";
                alertModalBody.value = "An unexpected error occurred. Please try again.";
                isAlertModalOpen.value = true;
            } finally {
                actionButtonLoader.value = false;
            }
        };

        const changePage = (page) => {
            if (page >= 1 && page <= totalPages.value) {
                currentPage.value = page;
                fetchAdminsData(page, itemsPerPage.value);
            }
        };

        const changeItemsPerPage = (perPage) => {
            itemsPerPage.value = perPage;
            currentPage.value = 1;
            fetchAdminsData(1, perPage);
        };

        return {
            tableHeaders,
            searchFields,
            totalPages,
            currentPage,
            itemsPerPage,
            changePage,
            changeItemsPerPage,
            formattedAdminsData,
            adminLoader,
            idForActions,
            getDataForDetailsView,
            viewAction,
            editAction,
            deleteAction,
            searchStringFromChild,
            isAlertModalOpen,
            closeAlertModal,
            alertModalHeader,
            alertModalBody,
            isDeleteModalOpen,
            closeConfirmationModal,
            confirmationModalHeader,
            confirmationModalBody,
            openDeleteConfirmationModal,
            actionButtonLoader,
            openFormModal,
            closeFormModal,
            isFormModalOpen,
            isSaveButtonClicked,
            actionLoader,
            saveButtonIsClicked,
            updateButtonLoader
        };
    }
};
</script>

<style scoped>
.mainContent {
    margin-top: 20px;
}
</style>
