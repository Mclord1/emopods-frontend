<template>
    <div class="row">
        <div class="col-12">
            <div class="page-title-box">
                <h4 class="page-title">Listeners Pending Verifications</h4>
            </div>
        </div>
    </div>

    <div class="row mainContent">
        <div class="col-sm-12">
            <TableView :data="formattedWaitlistData" :headers="tableHeaders" :id="idForActions"
                :detailsData="getDataForDetailsView" :showSearchField="true"
                :searchStringFromParent.sync="searchStringFromChild" :loading="waitlistLoader" :showActionsColumn="true"
                :searchFields="searchFields" :paging="waitlistPayload?.paging" :links="waitlistPayload?.links"
                :approveAction="handleApprove" />
        </div>
    </div>

    <AlertModal :isAlertModalOpen="isAlertModalOpen" @closeAlertModal="closeAlertModal" buttonText="Okay"
        @itemClicked="closeAlertModal" :alertModalHeader="alertModalHeader" :alertModalBody="alertModalBody" />

    <ConfirmationModal :isConfirmationModalOpen="isConfirmationModalOpen"
        @closeConfirmationModal="closeConfirmationModal" :buttonText="confirmationAction"
        :buttonLoader="actionButtonLoader" @itemClicked="handleConfirmation"
        :confirmationModalHeader="confirmationModalHeader" :confirmationModalBody="confirmationModalBody" />
</template>

<script>
import { computed, onMounted, ref } from "vue";
import TableView from "@/components/TableView.vue";
import AlertModal from "@/components/AlertModal.vue";
import ConfirmationModal from "@/components/ConfirmationModal.vue";
import getWaitlist from "@/composables/getWaitlist";

export default {
    emits: ['showLoader', 'flashMessage', 'data-loaded'],
    components: {
        TableView,
        AlertModal,
        ConfirmationModal
    },
    setup() {
        document.title = 'Pending Verifications';
        const {
            fetchWaitlistData,
            waitlistData,
            waitlistPayload,
            formattedWaitlistData,
            waitlistLoader,
            approveUser
        } = getWaitlist();

        const isAlertModalOpen = ref(false);
        const alertModalHeader = ref('');
        const alertModalBody = ref('');
        const isConfirmationModalOpen = ref(false);
        const confirmationModalHeader = ref('');
        const confirmationModalBody = ref('');
        const actionButtonLoader = ref(false);
        const confirmationAction = ref('');
        const selectedUserId = ref(null);
        const pendingAction = ref(null);

        onMounted(() => {
            fetchWaitlistData();
        });

        const tableHeaders = computed(() => {
            return [
                { label: "Name", key: "name" },
                { label: "Email", key: "email" },
                { label: "Phone", key: "phone" },
                { label: "Created At", key: "created_at" }
            ];
        });

        const searchStringFromChild = ref("");
        const searchFields = ['name', 'email', 'phone', 'gender', 'status', 'created_at'];

        const idForActions = computed(() => waitlistData.value.map(item => item.id));
        const getDataForDetailsView = computed(() => waitlistData.value);

        const handleApprove = (item, id) => {
            selectedUserId.value = id;
            pendingAction.value = 'approve';
            confirmationAction.value = 'Convert';
            confirmationModalHeader.value = 'Convert to App User';
            confirmationModalBody.value = `Are you sure you want to approve ${item.name} to an app user?`;
            isConfirmationModalOpen.value = true;
        };

        const handleConfirmation = async () => {
            try {
                actionButtonLoader.value = true;
                const result = await approveUser(selectedUserId.value);

                isConfirmationModalOpen.value = false;
                alertModalHeader.value = result.success ? "Success" : "Error";
                alertModalBody.value = result.message;
                isAlertModalOpen.value = true;

                if (result.success) {
                    await fetchWaitlistData();
                }
            } finally {
                actionButtonLoader.value = false;
            }
        };

        const closeConfirmationModal = () => {
            isConfirmationModalOpen.value = false;
            selectedUserId.value = null;
            pendingAction.value = null;
        };

        const closeAlertModal = () => {
            isAlertModalOpen.value = false;
            alertModalHeader.value = '';
            alertModalBody.value = '';
        };

        return {
            tableHeaders,
            searchFields,
            formattedWaitlistData,
            waitlistLoader,
            waitlistPayload,
            idForActions,
            getDataForDetailsView,
            searchStringFromChild,
            handleApprove,
            isAlertModalOpen,
            alertModalHeader,
            alertModalBody,
            closeAlertModal,
            isConfirmationModalOpen,
            confirmationModalHeader,
            confirmationModalBody,
            closeConfirmationModal,
            actionButtonLoader,
            confirmationAction,
            handleConfirmation
        };
    }
};
</script>

<style scoped>
.mainContent {
    margin-top: 20px;
}
</style>