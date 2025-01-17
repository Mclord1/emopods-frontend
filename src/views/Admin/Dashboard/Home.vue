<template>
    <div class="row">
        <StatCards statCardText1="Total Users" :statsCardNumber1="dashboardStats.totalUsers" bgColor="purple" />
        <StatCards statCardText1="Active Users" :statsCardNumber1="dashboardStats.activeUsers" bgColor="green" />
        <StatCards statCardText1="Waitlist Users" :statsCardNumber1="dashboardStats.totalWaitList"
            bgColor="stats-card" />
        <StatCards statCardText1="Admin Users" :statsCardNumber1="dashboardStats.adminUsers" bgColor="red" />
    </div>

    <div class="row">
        <div class="col-12">
            <h2>Recent App Users</h2>
        </div>
    </div>
    <div class="row mt-3">
        <div class="col-12">
            <TableView :data="recentUsers" :headers="tableHeaders"
                :loading="recentUsersLoader" :showActionsColumn="false" :showSearchField="true"
                :searchFields="searchFields" :searchStringFromParent.sync="searchStringFromChild" />
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import StatCards from '@/components/StatCards.vue'
import TableView from '@/components/TableView.vue'
import getDashboardStats from '@/composables/getDashboardStats'
import { API_BASE_URL } from "@/config"
import { useAuthStore } from "@/store/authStore"
import { formatDate } from "@/utils/helpers"

export default {
    emits: ['showLoader', 'flashMessage', 'data-loaded'],
    components: { StatCards, TableView },
    setup() {
        document.title = 'Home'
        const { dashboardStats, statsLoader, fetchDashboardStats } = getDashboardStats()
        const recentUsers = ref([])
        const recentUsersLoader = ref(false)
        const searchStringFromChild = ref("")

        const tableHeaders = [
            { label: "Name", key: "name" },
            { label: "Email", key: "email" },
            { label: "Phone", key: "phone" },
            { label: "Created At", key: "created_at" }
        ]

        const searchFields = ['name', 'email', 'phone', 'created_at']

        const fetchRecentUsers = async () => {
            try {
                recentUsersLoader.value = true
                const authStore = useAuthStore()
                await authStore.checkAuthentication()
                const accessToken = authStore.getAccessToken

                const response = await fetch(`${API_BASE_URL}/admin/app-users`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })

                const result = await response.json()

                if (response.ok && result.status === "success") {
                    recentUsers.value = result.data.payload
                        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                        .slice(0, 5)
                        .map(user => ({
                            name: `${user.first_name} ${user.last_name}`,
                            email: user.email,
                            phone: user.phone_number || '-',
                            created_at: formatDate(user.created_at)
                        })) || []
                }
            } catch (error) {
                console.error("Error fetching recent users:", error)
                recentUsers.value = []
            } finally {
                recentUsersLoader.value = false
            }
        }

        onMounted(async () => {
            await fetchDashboardStats()
            await fetchRecentUsers()
        })

        return {
            dashboardStats,
            statsLoader,
            recentUsers,
            recentUsersLoader,
            tableHeaders,
            searchFields,
            searchStringFromChild
        }
    }
}
</script>

<style scoped>
.mt-3 {
    margin-top: 1rem;
}
</style>