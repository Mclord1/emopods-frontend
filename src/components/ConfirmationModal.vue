<template>
    <div class="modal" v-if="isConfirmationModalOpen">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="multiple-oneModalLabel">
                        {{ confirmationModalHeader }}
                    </h4>

                    <img
                        src="@/assets/img/icons/close_icon.svg"
                        alt="close icon"
                        height="35"
                        width="35"
                        class="close-icon"
                        @click="closeModal"
                    />
                </div>
                <div class="modal-body">
                    <div class="form-inputs">
                        <p class="mb-0">{{ confirmationModalBody }}</p>
                    </div>

                    <div class="role-footer">
                        <RegularButton buttonText="Cancel" class="custom-button medium cancel-button" @click="closeModal"/>
                        <RegularButton :buttonText="buttonText" class="color-alert-danger-button medium"
                                       :loading="buttonLoader" @click="buttonAction"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RegularButton from "@/components/RegularButton.vue";

export default {
    components: {RegularButton},
    props: {
        isConfirmationModalOpen: Boolean,
        buttonText: String,
        buttonLoader: Boolean,
        confirmationModalHeader: String,
        confirmationModalBody: String
    },
    setup(props, {emit}) {

        const closeModal = () => {
            emit("closeConfirmationModal");
        };

        const buttonAction = () => {
            emit('itemClicked')
        }

        return {
            closeModal,
            buttonAction
        };
    },
};
</script>

<style scoped>
.close-icon {
    cursor: pointer;
}

.modal {
    /* Add styles for modal overlay and positioning */
    /* Example styles: */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    overflow-y: auto; /* Add vertical scrolling */
}

.modal-dialog {
    /* Add styles for modal dialog box */
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    max-width: 500px;
    width: 80%;
    margin: auto;
    max-height: 90vh; /* Set a maximum height (adjust as needed) */
    overflow-y: auto !important; /* Add vertical scrolling within the modal */
}

.modal-content {
    border-radius: 4px;
    padding: 0;
    display: inherit;
    overflow-y: auto !important;
    max-height: 90vh;
}

.modal-content > p {
    color: #333;
    margin-bottom: 40px;
    font-size: 14px;
}

.modal-content > p > span {
    font-weight: bold;
}

.modal-content > h4 {
    margin-bottom: 20px !important;
}

.modal-content > img {
    margin: 0 auto 30px;
}

.modal-content > .link {
    color: #9a9a9a;
    font-size: 16px;
    text-decoration: underline;
    margin-top: 20px;
}

.modal-header {
    padding: 16px;
    align-items: center;
}

.modal-title {
    color: var(--v-primary-text-dark-neutral);
    font-size: 16px;
    font-family: "Graphik Medium", sans-serif !important;
}

.modal-body {
    padding: 0
}

@media (max-width: 767px) {
    .modal-dialog {
        width: 90%;
    }

    .modal-body {
        padding: 0
    }

    .modal-header {
        padding: 20px;
    }
}

@media (max-width: 992px) {
    .modal-dialog {
        width: 90%;
    }

    .modal-body {
        padding: 0
    }

    .modal-header {
        padding: 20px;
    }
}

.role-footer {
    padding: 16px;
    background-color: var(--v-primary-gray-lighten);
    display: flex;
    justify-content: end;
}

.cancel-button {
    margin-right: 12px;
}

.form-inputs {
    padding: 0 16px 16px;
}
</style>
