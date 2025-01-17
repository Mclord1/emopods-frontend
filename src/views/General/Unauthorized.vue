<template>
    <div class="row no-access-container">
        <div class="col-12 d-flex justify-content-center align-items-center">
            <div class="text-center">
                <img src="@/assets/img/icons/unauthorized.png" alt="Unauthorized Access" class="no-access-img">
                <h2>Unauthorized</h2>
                <p>You are not authorized to access this page!</p>
                <RegularButton buttonText="Go to Dashboard" class="custom-button medium"
                               @clicked="goToDashboard"/>

            </div>
        </div>
    </div>
</template>
<script>
import RegularButton from "@/components/RegularButton.vue";
import {useRouter} from "vue-router";

export default {
    props: {},
    components: {RegularButton},
    setup() {
        const router = useRouter()
        const goToDashboard = () => {
            router.push('/')
        }

        return { goToDashboard }
    }
}
</script>
<style scoped>
.no-access-img {
    height: 250px;
    margin-bottom: 30px;
}

.no-access-container {
    height: 50dvh;
}
</style>