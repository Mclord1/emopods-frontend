import { ref, computed } from "vue";
import { API_BASE_URL } from "@/config";
import { useAuthStore } from "@/store/authStore";
import { formatDate, capitalizeFirstLetter } from "@/utils/helpers";

export default function getCustomers() {
    const customersList = ref([]);
    const customersPayload = ref(null);
    const customerLoader = ref(false);

    const fetchCustomersData = async (page = 1, pageSize = 20) => {
        try {
            customerLoader.value = true;
            const authStore = useAuthStore();
            await authStore.checkAuthentication();
            const accessToken = authStore.getAccessToken;

            const response = await fetch(`${API_BASE_URL}/admin/app-users`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            const result = await response.json();

            if (response.ok && result.status === "success") {
                customersList.value = result.data.payload;
                customersPayload.value = result.data;
            }
        } catch (error) {
            console.error("Error fetching customers:", error);
        } finally {
            customerLoader.value = false;
        }
    };

    const formattedCustomersData = computed(() => {
        return customersList.value.map(customer => ({
            name: `${customer.first_name} ${customer.last_name}`,
            email: customer.email,
            type: capitalizeFirstLetter(customer.type),
            availability: customer.availability,
            status: customer.status,
            phone: customer.phone_number || '-',
            created_at: formatDate(customer.created_at)
        }));
    });

    return {
        fetchCustomersData,
        customersList,
        customersPayload,
        formattedCustomersData,
        customerLoader
    };
} 