<template>

    <div class="table-container">

        <div class="cardbox-header">
            <p class="table-card-header" v-if="tableName">
                {{ tableName }}
            </p>

            <div class="input-group" v-if="showSearchField">
                <div class="input-group-prepend">
                    <span class="input-group-text">
                        <img id="search" src="@/assets/img/icons/blue_search_icon.svg" alt="Search Icon" />
                    </span>
                </div>

                <input type="text" placeholder="Search" class="form-control table_search" @input="emitSearchTerm"
                    v-model="searchTerm" />
            </div>
        </div>


        <div class="table-responsive tableLayout">
            <table class="table table-borderless table-hover mb-0">
                <thead>
                    <tr>
                        <th v-for="header in headers" :key="header.key">
                            <template v-if="header.key === 'employees_count'">
                                <div class="text-center">
                                    {{ header.label }}
                                </div>
                            </template>

                            <template v-else>
                                {{ header.label }}
                            </template>

                        </th>

                        <th class="actions" v-if="showActionsColumn">
                            <span class="mr-2">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="loading" class="loader-row">
                        <td :colspan="headers.length + 1">
                            <div class="linear-loader">
                                <div class="train"></div>
                            </div>
                        </td>
                    </tr>

                    <tr v-if="paginatedData.length === 0">
                        <td :colspan="headers.length + 1" class="no-data">
                            No Data Available
                        </td>
                    </tr>

                    <!-- Loop through data rows provided via props -->
                    <tr v-else v-for="(row, index) in paginatedData" :key="index">

                        <!-- Loop through row items -->
                        <td v-for="(item, columnIndex) in row" :key="columnIndex">

                            <template v-if="columnIndex === 'is_active'">
                                <!-- Set the text color dynamically based on the status -->
                                <span :style="{ color: getStatusColor(row[columnIndex]) }">{{ row[columnIndex] }}</span>
                            </template>

                            <template v-else-if="columnIndex === 'visibility'">
                                <span :class="`badge badge-${getVisibilityColor(row[columnIndex])}`">
                                    {{ row[columnIndex] }}
                                </span>
                            </template>

                            <template v-else-if="columnIndex === 'user'">
                                <div class="name-container">
                                    <div class="avatar-md mr-10">
                                        <span
                                            :class="`avatar-title bg-soft-${item.avatarColor} text-${item.avatarColor} font-20 rounded-circle`">
                                            {{ item.initials }}
                                        </span>
                                    </div>
                                    <div>
                                        <p class="m-0">{{ item.name }}</p>
                                        <span class="tableEmail" v-if="item.email">{{ item.email }}</span>
                                    </div>
                                </div>
                            </template>

                            <template v-else-if="columnIndex === 'employees_count'">
                                <div class="text-center">
                                    {{ item }}
                                </div>
                            </template>


                            <template v-else-if="columnIndex === 'status'">
                                <span class="badge badge-success" v-if="item === 'active'">{{
                                    capitalizeFirstLetter(item) }}</span>
                                <span class="badge badge-secondary" v-else-if="item === 'Open'">{{ item }}</span>
                                <span class="badge badge-warning" v-else-if="item === 'In Progress'">{{ item }}</span>
                                <span class="badge badge-warning" v-else-if="item === 'Pending'">{{ item }}</span>
                                <span class="badge badge-warning" v-else-if="item === 'Technician Notified'">{{
                                    item
                                    }}</span>
                                <span class="badge badge-danger" v-else-if="item === 'inactive'">{{ item }}</span>
                                <span class="badge badge-danger" v-else-if="item === 'Canceled'">{{ item }}</span>
                                <span class="badge badge-success" v-if="item === 'online'">{{
                                    capitalizeFirstLetter(item) }}</span>
                                <span class="badge badge-danger" v-else-if="item === 'offline'">{{
                                    capitalizeFirstLetter(item) }}</span>
                            </template>

                            <template v-else-if="columnIndex === 'availability'">
                                <span class="badge badge-success" v-if="item === 'online'">{{
                                    capitalizeFirstLetter(item) }}</span>
                                <span class="badge badge-danger" v-else-if="item === 'offline'">{{
                                    capitalizeFirstLetter(item) }}</span>
                            </template>



                            <template v-else-if="columnIndex === 'priority'">
                                <span class="badge badge-secondary" v-if="item === 'Low'">{{ item }}</span>
                                <span class="badge badge-warning" v-else-if="item === 'Medium'">{{ item }}</span>
                                <span class="badge badge-danger" v-else-if="item === 'High'">{{ item }}</span>
                            </template>

                            <template v-else>
                                {{ item }}
                            </template>
                        </td>

                        <!-- Actions column -->
                        <td class="actions" v-if="showActionsColumn" style="white-space: nowrap">
                            <RegularButton buttonText="View" class="color-alert-info-button medium sm mr-2"
                                @clicked="viewAction(detailsData[index], id[index])" v-if="viewAction" />

                            <a href="#" @click.prevent="editAction(detailsData[index], id[index])" v-if="editAction">
                                <i class="mdi mdi-pencil text-primary mr-2" style="font-size: 18px;"></i>
                            </a>

                            <a href="#" @click.prevent="deleteAction(detailsData[index], id[index])"
                                v-if="deleteAction">
                                <i class="mdi mdi-delete text-primary mr-2" style="font-size: 18px;"></i>
                            </a>

                            <RegularButton v-if="approveAction" buttonText="Convert to App User"
                                class="color-alert-success-button medium sm"
                                @clicked="approveAction(detailsData[index], id[index])" />
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="row" v-if="totalRecords > 0">
                <div class="col-sm-12 col-md-6 pagination-numbers">
                    <p class="mb-0 ml-2">Total Records: {{ totalRecords }} |
                        Records per page: <span class="ml-1">{{ itemsPerPage }}</span></p>

                    <div class="dropdown-container">
                        <img src="@/assets/img/icons/gray_dropdown_icon.svg" class="page-dropdown"
                            alt="Page select dropdown" @click="toggleDropdown">

                        <!-- Dropdown content -->
                        <div v-if="isDropdownOpen" class="dropdown-content">
                            <ul class="list-group">
                                <li class="list-group-item text-center" v-for="count in pageCounts" :key="count"
                                    @click="changeItemsPerPage(count)">
                                    {{ count }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Pagination controls -->
                <div class="col-sm-12 col-md-6 table-pagination">
                    <p class="mb-0 ml-2 mr-3">Page {{ currentPage }} of {{ totalPages }}</p>

                    <a href="#" @click.prevent="changePage(currentPage - 1)"
                        :class="['pagination-rounded mr-10', { 'disabled': currentPage === 1 }]">
                        <img src="@/assets/img/icons/pagination_icon_backward.svg" alt="Previous Button">
                    </a>

                    <a href="#" @click.prevent="changePage(currentPage + 1)"
                        :class="['pagination-rounded end-pagination-btn', { 'disabled': currentPage === totalPages }]">
                        <img src="@/assets/img/icons/pagination_icon_forward.svg" alt="Next Button">
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref, watch } from 'vue';
import RegularButton from "@/components/RegularButton.vue";
import { capitalizeFirstLetter } from '@/utils/helpers';

export default {
    components: { RegularButton },
    props: {
        data: Array,
        headers: Array,
        id: Array,
        tableName: String,
        loading: Boolean,
        hasFilter: Boolean,
        searchStringFromParent: String,
        showActionsColumn: Boolean,
        viewAction: Function,
        editAction: Function,
        deleteAction: Function,
        searchFields: Array,
        detailsData: Array,
        paging: {
            type: Object,
            default: () => ({
                total_items: 0,
                page_size: 20,
                current: 1,
                count: 0
            })
        },
        links: {
            type: Array,
            default: () => []
        },
        showSearchField: Boolean,
        isAPISearchNeeded: {
            type: Boolean,
            default: false
        },
        tableLayout: Boolean,
        showTotalRecords: Boolean,
        approveAction: Function,
        rejectAction: Function
    },
    emits: ['showLoader', 'flashMessage', 'data-loaded', 'searchWord', 'update:searchStringFromParent', 'update:currentPage'],
    setup(props, { emit }) {
        const searchTerm = ref('')
        const isDropdownOpen = ref(false);
        const pageCounts = [10, 20, 50, 100];

        // Computed properties for pagination
        const totalRecords = computed(() => props.paging?.total_items || 0)
        const itemsPerPage = computed(() => props.paging?.page_size || 20)
        const currentPage = computed(() => props.paging?.current || 1)
        const totalPages = computed(() => Math.ceil(totalRecords.value / itemsPerPage.value))

        const paginatedData = computed(() => {
            if (props.isAPISearchNeeded) {
                return props.data
            }
            return filteredData.value
        });



        watch(() => props.searchStringFromParent, (newSearchTerm) => {
            searchTerm.value = newSearchTerm
        })

        watch(() => props.currentPage, (newPage) => {
            currentPage.value = newPage
        });

        const emitSearchTerm = () => {
            emit("update:searchStringFromParent", searchTerm.value)
            emit('searchWord', searchTerm.value)
            currentPage.value = 1;
        }

        const filteredData = computed(() => {
            return props.data.filter((row) => {
                return props.searchFields.some((field) => {
                    if (field === 'itemName.name') {
                        const itemName = row.itemName;
                        if (itemName && itemName.name) {
                            const fieldValue = String(itemName.name).toLowerCase();
                            const searchTermLower = searchTerm.value.toLowerCase();
                            return fieldValue.includes(searchTermLower);
                        }
                        return false;
                    } else if (field === 'user.name') {
                        const userName = row.user && row.user.name;
                        if (userName) {
                            const fieldValue = String(userName).toLowerCase();
                            const searchTermLower = searchTerm.value.toLowerCase();
                            return fieldValue.includes(searchTermLower);
                        }
                        return false;
                    } else if (field === 'user.email') {
                        const userEmail = row.user && row.user.email;
                        if (userEmail) {
                            const fieldValue = String(userEmail).toLowerCase();
                            const searchTermLower = searchTerm.value.toLowerCase();
                            return fieldValue.includes(searchTermLower);
                        }
                        return false;
                    } else {
                        const fieldValue = String(row[field]).toLowerCase();
                        const searchTermLower = searchTerm.value.toLowerCase();
                        return fieldValue.includes(searchTermLower);
                    }
                });
            });
        })

        const toggleDropdown = () => {
            isDropdownOpen.value = !isDropdownOpen.value
        }

        const changeItemsPerPage = (perPage) => {
            emit('update:itemsPerPage', perPage)
            toggleDropdown()
        }

        const changePage = (page) => {
            if (page >= 1 && page <= totalPages.value) {
                emit('update:currentPage', page);
            }
        };

        const displayedPages = computed(() => {
            const range = 4;
            const startPage = Math.max(1, props.currentPage - 1);
            const endPage = Math.min(props.totalPages, startPage + range - 1);

            return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
        })

        return {
            searchTerm,
            emitSearchTerm,
            paginatedData,
            currentPage,
            itemsPerPage,
            changePage,
            displayedPages,
            isDropdownOpen,
            pageCounts,
            toggleDropdown,
            changeItemsPerPage,
            capitalizeFirstLetter,
            totalRecords,
            totalPages
        };
    }
};
</script>

<style scoped>
.table-pagination {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 8px;
    padding-bottom: 8px;
}

.pagination-numbers {
    display: flex;
    align-items: center;
    padding: 6px 10px;
}

.end-pagination-btn {
    margin-right: 10px;
}

h4 {
    font-weight: 700;
    color: #333;
    margin-bottom: 20px;
}

.table_search {
    background-color: var(--v-primary-white) !important;
    border: 1px solid var(--v-primary-light-gray) !important;
    border-left: none !important;
    padding-left: 0;
}

.table_search::placeholder {
    color: var(--v-primary-text-dark-neutral);
    font-size: 14px;
}

.cardbox-header {
    display: flex;
    align-items: center;
    margin: 6px 0 6px 4px;
}

.input-group {
    width: 20%;
    min-width: 250px;
}

.input-group-text {
    background-color: #e9ecef;
    padding-right: 4px;
    border-radius: 4px;
    border: 1px solid var(--v-primary-light-gray);
}


.input-group>.input-group-prepend>.input-group-text {
    background-color: var(--v-primary-white);
}

#search {
    height: 16px;
    width: 16px;
    color: #333333;
    margin-right: 5px;
}

.table-container {
    border: 1px solid var(--v-primary-light-gray);
    border-radius: 8px;
    overflow: visible;
}

.table-responsive {
    overflow: visible;
}

.table {
    width: 100%;
    color: #333333 !important;
}

.table td,
.table thead th {
    padding: 10px;
    white-space: normal;
}

.table-borderless thead,
.table-borderless td {
    border-bottom: 1px solid var(--v-primary-light-gray);
}

.table-borderless thead {
    color: var(--v-primary-text-dark-neutral);
    font-size: 12px;
    background-color: var(--v-primary-light-gray);
    font-family: "Graphik Medium", sans-serif !important;
    border: 1px solid var(--v-primary-text-light-neutral);
    border-left: none !important;
    border-right: none !important;
}

.actions {
    text-align: right;
}

.page-dropdown {
    padding: 6px;
    cursor: pointer;
}

.dropdown-container {
    position: relative;
    margin-left: 6px;
    /* Adjust margin as needed */
}

.dropdown-content {
    position: absolute;
    top: 100%;
    /* Position it below the dropdown icon */
    left: 0;
    z-index: 9999999
}

.list-group {
    margin: 0;
    /* Remove default margin on list items */
}

.list-group-item {
    cursor: pointer;
}

.list-group-item:hover {
    background-color: var(--v-primary-light-gray);
}

.tableEmail {
    font-size: 11px;
    color: #9a9a9a;
}

td {
    vertical-align: middle !important;
}

.avatar-md {
    width: 40px;
    height: 40px;
}


/* Custom select */

.custom-select-wrapper select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 110px;
    padding: 10px;
    border-radius: 12px;
    background-color: #fff;
    border: 1px solid #f1f1f1;
    color: #333333;
}

.linear-loader {
    height: 3px;
    /* Adjust the height as needed */
    background-color: #89a6f3;
    /* Adjust the color as needed */
    width: 100%;
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    overflow: hidden;
}

.train {
    width: 900px;
    /* Adjust the train's width */
    height: 7px;
    /* Should match the height of the loader */
    background-color: #2f5bcf;
    /* Adjust the color as needed */
    position: absolute;
    animation: moveRight 1s linear infinite;
    /* Adjust the animation speed as needed */
    top: 0;
    left: 0;
}

@keyframes moveRight {
    0% {
        left: -50px;
        /* Start off the screen to the left */
    }

    100% {
        left: 100%;
        /* Move to the right of the screen */
    }
}

tr.loader-row td {
    padding: 0 !important;
}

.actions>a {
    cursor: pointer;
}

.no-data {
    text-align: center !important;
    font-family: "Graphik Medium", sans-serif;
}

.name-container {
    display: flex;
    align-items: center;
}

.table-card-header {
    color: var(--v-primary-text-dark);
    font-size: 18px;
    font-family: "Graphik Medium", sans-serif;
    margin: 5px 20px 5px 5px;
}

.disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.pagination-rounded {
    cursor: pointer;
}

.pagination-rounded.disabled {
    pointer-events: none;
}
</style>