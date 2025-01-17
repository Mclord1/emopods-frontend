<template>
    <div v-if="showAlert" class="alert alert-dismissible fade show semibold" role="alert"
         :class="alertClass">

        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>

        {{ message }}!
    </div>
</template>
<script>
import {onMounted, ref, watch} from "vue";

export default {
    props: {
        alertMessage: {
            type: String,
            default: 'This is a flash message'
        },
        alertType: {
            type: String,
            default: 'alert-success'
        },
        showAlert: Boolean
    },
    setup(props) {
        const message = ref(props.alertMessage)

        const showMessage = () => {
            message.value = props.alertMessage
        }

        onMounted(() => {
            showMessage()
        })

        watch(
            () => props.alertMessage,
            () => {
                showMessage()
            }
        )

        return {message}

    },
    computed: {
        alertClass() {
            if (this.alertType === 'error') {
                return 'alert-danger';
            } else {
                return this.alertType ? `alert-${this.alertType}` : 'alert-success'
            }
        }
    }
}
</script>
<style></style>