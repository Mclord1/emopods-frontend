<template>
    <button :type="buttonType" :class="[colorClass, customClass]" @click="onClick" :disabled="loading" v-if="!loading">
        <i :class="iconClass" v-if="iconText"></i>
        <span class="text">{{ buttonText }}</span>
    </button>

    <button :class="[colorClass, customClass]" type="button" disabled v-else>
        <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
        <span class="sr-only">Loading...</span>
    </button>
</template>

<script>
export default {
    props: {
        buttonText: {
            type: String,
            default: "Click Me", // Default text if not specified
        },
        iconText: String,
        color: {
            type: String,
            default: "blue",
        },
        class: String,
        loading: {
            type: Boolean,
            default: false,
        },
        buttonType: {
            type: String,
            default: "button",
        },
        buttonStyle: String
    },
    setup(props, { emit }) {
        const onClick = () => {
            // Emit a custom event when the button is clicked
            emit("clicked");
        };

        return { onClick };
    },
    computed: {
        iconClass() {
            // Combine the default icon class with the provided icon text
            return `mdi ${this.iconText} mr-1`;
        },
        colorClass() {
            return this.color ? this.color : "accent";
        },
        customClass() {
            return this.class ? `${this.class} custom-button` : "custom-button"; // Use the custom class if provided
        },
    },
};
</script>

<style scoped>
.custom-button {
    border-radius: .15rem;
    background-color: var(--v-primary-accent);
    color: var(--v-primary-white);
    font-size: var(--font-size-body);
    font-weight: 400;
    padding: 10px 24px;
    border: none;
    width: 100%;
    text-align: center;
}

.accent {
    background-color: var(--v-primary-accent);
    color: white;
}

.gray {
    background-color: #434343;
    color: white;
}

.error {
    background-color: #F75549;
}

button>i {
    font-size: 16px;
}

.color-alert-danger-button {
    background-color: var(--v-primary-alert-danger);
    color: var(--v-primary-alert-danger-text);
    border-radius: .15rem;
    font-size: var(--font-size-body);
    font-weight: 400;
    padding: 10px 24px;
    border: none;
    text-align: center;
}

.color-alert-success-button {
    background-color: var(--v-primary-alert-success);
    color: var(--v-primary-alert-success-text);
    border-radius: .15rem;
    font-size: var(--font-size-body);
    font-weight: 400;
    padding: 10px 24px;
    border: 1px solid var(--v-primary-alert-success-text);
    text-align: center;
}

.medium {
    font-family: "Graphik Medium", sans-serif !important;
}

.sm {
    padding: 6px 12px;
}
</style>