<template>
    <div class="form-group">
        <label class="label" v-if="labelText">
            <div>
                {{ labelText }}
            <span class="required" v-if="isRequired">*</span>
            </div>
            <span class="label-helper" v-if="labelHelper" @click="labelHelperFunction">{{ labelHelper }}</span>
        </label>

        <div class="input-group" v-if="config.inputFieldType === 'password'">
            <input
                :type="showPassword ? 'text' : 'password'"
                :class="[fieldClass, errorMessage ? 'validError' : '', headerText, autoHeight]"
                :placeholder="config.placeholder"
                :value="modelValue"
                @input="updateValue($event.target.value)"
                :disabled="isDisabled"
                :required="isRequired"
                :autofocus="shouldAutofocus"
            />
            <div class="input-group-append">
                <button class="btn btn-secondary" type="button" @click="togglePassword">
                    <i :class="['fas', showPassword ? 'fa-eye-slash' : 'fa-eye']"></i>
                </button>
            </div>
        </div>

        <input
            v-else
            :type="config.inputFieldType"
            :class="[fieldClass, errorMessage ? 'validError' : '', headerText, autoHeight]"
            :placeholder="config.placeholder"
            :value="modelValue"
            @input="updateValue($event.target.value)"
            :disabled="isDisabled"
            :required="isRequired"
            :autofocus="shouldAutofocus"
        />

        <div class="invalid-feedback" v-if="errorMessage">
            {{ errorMessage }}
        </div>
    </div>
</template>

<script>
import {ref} from "vue";

export default {
    props: {
        config: {
            type: Object,
            required: true,
        },
        errorMessage: String,
        labelText: String,
        modelValue: [String, Number],
        isDisabled: {
            type: Boolean,
            default: false
        },
        isRequired: {
            type: Boolean,
            default: false
        },
        shouldAutofocus: {
            type: Boolean,
            default: false
        },
        labelHelper: String,
        labelHelperFunction: Function,
        headerText: String,
        autoHeight: String,
    },
    setup(props, {emit}) {
        const showPassword = ref(false);

        const togglePassword = () => {
            showPassword.value = !showPassword.value;
        };

        const updateValue = (newValue) => {
            emit("update:modelValue", newValue); // Emit the updated value
        };

        return {updateValue, showPassword, togglePassword};
    },
    computed: {
        placeholderText() {
            return this.config.placeholder || "Enter Text";
        },
        fieldClass() {
            return this.config.class
                ? `form-control ${this.config.class}`
                : "form-control";
        },
        inputFieldType() {
            return this.config.type || "text";
        },
    },
};
</script>

<style scoped>
.invalid-feedback {
    display: block;
    width: 100%;
    margin-top: 0.25rem;
    font-size: 0.75rem;
    color: #f1556c;
}

.validError {
    border-color: #f1556c !important;
}

.required {
    color: red; /* or any other color you prefer */
    margin-left: 2px; /* Adjust spacing as needed */
    font-weight: bolder;
}

.label {
    display: flex;
    justify-content: space-between;
    font-size: 12px !important;
    font-family: "Graphik Medium", sans-serif !important;
    margin-bottom: 8px !important;
}

.label-helper {
    font-size: var(--font-size-body);
    color: var(--v-primary-accent);
    cursor: pointer;
}

.header-text {
    font-size: 1.875rem !important;
    font-family: 'Graphik Semibold', 'Arial', sans-serif !important;
}

.auto-height {
    height: auto !important;
}

.portion-field {
    width: 70px !important;
}
</style>