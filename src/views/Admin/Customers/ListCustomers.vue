<template>
    <div class="row">
        <div class="col-12">
            <div class="page-title-box">
                <h4 class="page-title">App Users</h4>
            </div>
        </div>
    </div>

    <div class="row mainContent">
        <div class="col-sm-12">
            <TableView :data="formattedCustomersData" :headers="tableHeaders" :id="idForActions"
                :detailsData="getDataForDetailsView" :showSearchField="true"
                :searchStringFromParent.sync="searchStringFromChild" :loading="customerLoader"
                :showActionsColumn="false" :searchFields="searchFields" :totalPages="totalPages"
                :currentPage.sync="currentPage" :changePage="changePage" :itemsPerPage="itemsPerPage"
                :changeItemsPerPage="changeItemsPerPage" />
        </div>
    </div>
</template>

<script>
import { computed, onMounted, ref, watch } from "vue";
import TableView from "@/components/TableView.vue";
import getCustomers from "@/composables/getCustomers";

export default {
    emits: ['showLoader', 'flashMessage', 'data-loaded'],
    components: {
        TableView
    },
    setup() {
        document.title = 'App Users';
        const {
            fetchCustomersData,
            customersList,
            customersPayload,
            formattedCustomersData,
            customerLoader
        } = getCustomers();

        const itemsPerPage = ref(10);
        const totalPages = ref(0);
        const currentPage = ref(1);

        onMounted(() => {
            fetchCustomersData(1, itemsPerPage.value);
        });

        watch(customersPayload, () => {
            if (customersPayload.value) {
                const paging = customersPayload.value.paging;
                totalPages.value = Math.ceil(paging.total_items / paging.page_size);
                currentPage.value = paging.current;
            }
        });

        const tableHeaders = computed(() => {
            return [
                { label: "Name", key: "name" },
                { label: "Email", key: "email" },
                { label: "Type", key: "type" },
                { label: "Availability", key: "availability" },
                { label: "Status", key: "status" },
                { label: "Phone", key: "phone" },
                { label: "Date Created", key: "created_at" }
            ];
        });

        const searchStringFromChild = ref("");
        const searchFields = ['name', 'username', 'email', 'type', 'availability', 'status', 'phone', 'created_at'];

        const idForActions = computed(() => customersList.value.map(item => item.id));
        const getDataForDetailsView = computed(() => customersList.value);

        const changePage = (page) => {
            if (page >= 1 && page <= totalPages.value) {
                currentPage.value = page;
                fetchCustomersData(page, itemsPerPage.value);
            }
        };

        const changeItemsPerPage = (perPage) => {
            itemsPerPage.value = perPage;
            currentPage.value = 1;
            fetchCustomersData(1, perPage);
        };

        return {
            tableHeaders,
            searchFields,
            totalPages,
            currentPage,
            itemsPerPage,
            changePage,
            changeItemsPerPage,
            formattedCustomersData,
            customerLoader,
            idForActions,
            getDataForDetailsView,
            searchStringFromChild
        };
    }
};
</script>

<style scoped>
.mainContent {
    margin-top: 20px;
}
</style>