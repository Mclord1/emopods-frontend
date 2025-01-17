<template>
    <div class="modal" v-if="isAlertModalOpen">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="form-inputs">
                        <h4>{{ alertModalHeader }}!</h4>
                        <p>{{ alertModalBody }}</p>
                    </div>

                    <div class="role-footer">
                        <RegularButtonBlock :buttonText="buttonText" class="custom-button medium" @click="buttonAction"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RegularButton from "@/components/RegularButton.vue";
import RegularButtonBlock from "@/components/RegularButtonBlock.vue";

export default {
    components: {RegularButtonBlock, RegularButton},
    props: {
        isAlertModalOpen: Boolean,
        buttonText: String,
        buttonFunction: Function,
        alertModalHeader: String,
        alertModalBody: String
    },
    setup(props, {emit}) {

        const closeAlertModal = () => {
            emit("closeAlertModal");
        };

        const buttonAction = () => {
            emit('itemClicked')
        }

        return {
            closeAlertModal,
            buttonAction
        };
    },
};
</script>

<style scoped>

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
    max-width: 400px;
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

h4 {
    font-size: 16px;
    font-family: "Graphik Medium", sans-serif;
    margin-bottom: 8px;
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

.modal-body {
    padding: 24px 0 0;
    text-align: center;
}

@media (max-width: 767px) {
    .modal-dialog {
        width: 90%;
    }

    .modal-body {
        padding: 0
    }

}

@media (max-width: 992px) {
    .modal-dialog {
        width: 90%;
    }

    .modal-body {
        padding: 0
    }

}

.role-footer {
    padding: 16px;
    display: flex;
    justify-content: end;
}


.form-inputs {
    padding: 0 16px 0;
}
</style>
