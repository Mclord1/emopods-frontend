<template>
    <div class="form-group">
        <label class="label" v-if="labelText">
            <div>
            {{ labelText }}
            <span class="required" v-if="isRequired">*</span>
            </div>
        </label>
        <textarea
            ref="textareaRef"
            :class="[fieldClass, errorMessage ? 'validError' : '', headerText]"
            class="rich-text-editor"
            :placeholder="config.placeholder"
            :value="modelValue"
            @input="updateValue($event.target.value)"
            rows="4"
            :disabled="isDisabled"
            :required="isRequired"
        ></textarea>

        <div class="invalid-feedback" v-if="errorMessage">
            {{ errorMessage }}
        </div>
    </div>
</template>

<script>


import {nextTick, ref, watchEffect} from "vue";

export default {
    props: {
        config: {
            type: Object,
            required: true,
        },
        errorMessage: String,
        labelText: String,
        modelValue: String,
        isDisabled: {
            type: Boolean,
            default: false
        },
        isRequired: {
            type: Boolean,
            default: false
        },
        headerText: String,
    },
    setup(props, {emit}) {
        const textareaRef = ref(null);

        // watchEffect(() => {
        //     nextTick(() => {
        //         console.log('textareaRef.value', textareaRef.value)
        //         textareaRef.value.style.height = "auto";
        //         textareaRef.value.style.height = textareaRef.value.scrollHeight + 'px';
        //     });
        // })

        const updateValue = (newValue) => {
            emit("update:modelValue", newValue); // Emit the updated value

            nextTick(() => {
                textareaRef.value.style.height = "auto";
                textareaRef.value.style.height = textareaRef.value.scrollHeight + 'px';
            });
        };



        return {updateValue, textareaRef};
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
        }
    },
};
</script>

<style scoped>
.label {
    font-size: 12px !important;
    font-family: "Graphik Medium", sans-serif !important;
}

.invalid-feedback {
    display: block;
    width: 100%;
    margin-top: 0.25rem;
    margin-bottom: 10px;
    font-size: 0.75rem;
    color: #f1556c;
}

.required {
    color: red; /* or any other color you prefer */
    margin-left: 2px; /* Adjust spacing as needed */
    font-weight: bolder;
}

.validError {
    border-color: #f1556c !important;
}

.header-text {
    font-size: 1.875rem !important;
    font-family: 'Graphik Semibold', 'Arial', sans-serif !important;
}

textarea {
    resize: none; /* This prevents resizing altogether */
}
</style>