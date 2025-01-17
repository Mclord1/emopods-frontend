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
            default: "accent",
        },
        class: String,
        buttonType: {
            type: String,
            default: "button",
        },
        loading: {
            type: Boolean,
            default: false,
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
        customClass() {
            return this.class ? this.class : ""; // Use the custom class if provided
        },
        colorClass() {
            return this.color ? this.color : "accent";
        },
    },
};
</script>

<style scoped>
.custom-button {
    border-radius: 5px;
    background-color: var(--v-primary-accent);
    color: var(--v-primary-white);
    font-size: var(--font-size-body);
    font-weight: 400;
    padding: 10px 24px;
    border: none;
    text-align: center;
}

.cancel-button {
    border-radius: 4px;
    background-color: var(--v-primary-white);
    color: var(--v-primary-text-dark-neutral);
    font-size: var(--font-size-body);
    font-family: "Graphik Medium", sans-serif !important;
    padding: 10px 24px;
    border: 1.5px solid var(--v-primary-light-gray);
    text-align: center;
}

.accent {
    background-color: var(--v-primary-accent);
    color: white;
    border: 1px solid var(--v-primary-accent);
    border-radius: 0.15rem;
}

.gray {
    background-color: #434343;
    color: white;
}

.error {
    background-color: #F75549;
    color: white;
}

.disabled {
    background-color: #b1b1b1;
    color: white;
}

.color-alert-danger-button {
    background-color: var(--btn-danger-bg);
    color: var(--btn-danger);
    border: none;
    border-radius: .15rem;
    font-size: var(--font-size-body);
    font-weight: 500;
    padding: 10px 24px;
    text-align: center;
}

.color-alert-success-button {
    background-color: var(--btn-success-bg);
    color: var(--btn-success);
    border: none;
    border-radius: .15rem;
    font-size: var(--font-size-body);
    font-weight: 500;
    padding: 10px 24px;
    text-align: center;
}

.color-alert-dark-button {
    background-color: var(--v-primary-alert-success);
    color: var(--v-primary-alert-success-text);
    border-radius: .15rem;
    font-size: var(--font-size-body);
    font-weight: 400;
    padding: 10px 24px;
    border: 1px solid var(--v-primary-alert-success-text);
    text-align: center;
}

.color-alert-blue-button {
    background-color: var(--btn-primary-bg);
    color: var(--btn-primary);
    border: none;
    border-radius: .15rem;
    font-size: var(--font-size-body);
    font-weight: 500;
    padding: 10px 24px;
    text-align: center;
}

.color-alert-warning-button {
    background-color: var(--btn-warning-bg);
    color: var(--btn-warning);
    border: none;
    border-radius: .15rem;
    font-size: var(--font-size-body);
    font-weight: 500;
    padding: 10px 24px;
    text-align: center;
}

.color-alert-info-button {
    background-color: var(--btn-info-bg);
    color: var(--btn-info);
    border: none;
    border-radius: .15rem;
    font-size: var(--font-size-body);
    font-weight: 500;
    padding: 10px 24px;
    text-align: center;
}

/* Hover states */
.color-alert-danger-button:hover {
    background-color: var(--btn-danger);
    color: white;
}

.color-alert-success-button:hover {
    background-color: var(--btn-success);
    color: white;
}

.color-alert-blue-button:hover {
    background-color: var(--btn-primary);
    color: white;
}

.color-alert-warning-button:hover {
    background-color: var(--btn-warning);
    color: white;
}

.color-alert-info-button:hover {
    background-color: var(--btn-info);
    color: white;
}

.medium {
    font-family: "Graphik Medium", sans-serif !important;
}

.sm {
    padding: 6px 12px;
}
</style>