<template>
    <div class="form-group" :class="['form-group', errorMessage ? 'error' : '']">
        <div class="custom-select-wrapper">
            <label :for="selectId" class="label" v-if="labelText">
                <div>
                    {{ labelText }}
                    <span class="required" v-if="isRequired">*</span>
                </div>
                <span class="label-helper" v-if="labelHelper" @click="labelHelperFunction">{{ labelHelper }}</span>
            </label>

            <div class="multiple-select-input-wrapper">
                <select
                    :id="selectId" v-model="selectedValues" @change="handleMultipleSelectChange"
                    class="js-example-placeholder-multiple" multiple="multiple"
                    :class="selectId"
                    :disabled="isDisabled" :required="isRequired">

                    <option></option>
                    <option v-for="(option, index) in itemOptions" :key="index" :value="option.value">
                        {{ option.label }}
                    </option>
                </select>
            </div>

            <div v-if="loading" class="linear-loader">
                <div class="train"></div>
            </div>

            <div class="invalid-feedback" v-if="errorMessage">
                {{ errorMessage }}
            </div>
        </div>
    </div>
</template>
<script>
import {onMounted, ref, watch} from "vue";

export default {
    props: {
        labelText: {
            type: String,
        },
        options: {
            type: [Array, String],
            required: true,
        },
        selectId: {
            type: String,
            default: 'example-select'
        },
        modelValue: [Array, Number, String],
        class: String,
        loading: Boolean,
        selectedItem: [Array, String],
        isDisabled: {
            type: Boolean,
            default: false
        },
        isRequired: {
            type: Boolean,
            default: false
        },
        maximumSelectionLength: {
            type: Number,
            default: 100
        },
        errorMessage: String,
        labelHelper: String,
        labelHelperFunction: Function
    },
    setup(props, {emit}) {
        const selectPlaceholder = 'Select an option'
        const selectedValues = ref(0)
        const fieldClass = props.class || ''
        const itemOptions = ref([])

        const handleMultipleSelectChange = () => {
            emit('update:modelValue', selectedValues.value);
        };


        onMounted(() => {
            const selectField = $(`.${props.selectId}`)

            selectField.select2({
                placeholder: selectPlaceholder,
                maximumSelectionLength: props.maximumSelectionLength
            });

            // Watch for changes in the selected item and update the selectedValues
            watch(() => props.modelValue, (newVal) => {
                if (newVal !== selectedValues.value) {
                    selectedValues.value = newVal;

                    // Update the Select2 field value after a short delay
                    setTimeout(() => {
                        selectField.val(selectedValues.value).trigger('change');
                    }, 100);
                }
            });

            if (props.options.length > 0) {
                selectedValues.value = props.modelValue;

                setTimeout(() => {
                    selectField.val(selectedValues.value).trigger('change');
                }, 100)
            }

            // Call handleMultipleSelectChange once the component is mounted to emit the initial value
            selectField.on('change', function () {
                selectedValues.value = $(this).val();
                handleMultipleSelectChange();
            })

            // Watch for changes in the options and reset selectedValues
            watch(() => props.options, (newOptions) => {
                if (!selectField || selectField.length === 0) {
                    console.error(`Element with class '${props.selectId}' not found.`);
                    return;
                }

                // Check if there are options to update
                if (newOptions.length > 0) {
                    // Clear the Select2 data and unbind the change event
                    selectField.select2('destroy');

                    // Remove all options
                    selectField.empty();

                    // Add new options
                    for (const option of newOptions) {
                        const optionElement = document.createElement('option');
                        optionElement.value = option.value;
                        optionElement.text = option.label;
                        selectField.append(optionElement);
                    }

                    // Reinitialize Select2
                    selectField.select2({
                        placeholder: selectPlaceholder,
                        allowClear: true,
                        maximumSelectionLength: props.maximumSelectionLength,
                    });

                    // Set the selected values
                    selectField.val(selectedValues.value).trigger('change');
                }

            });
        })

        return {selectedValues, fieldClass, handleMultipleSelectChange, itemOptions}
    }
}

</script>


<style scoped>
.label {
    display: flex;
    justify-content: space-between;
    font-size: 12px !important;
    font-family: "Graphik Medium", sans-serif !important;
}


/* Custom select */
.custom-select-wrapper {
    position: relative;
    display: block;
    width: 100%; /* Adjust the width as needed */
}

.custom-select-wrapper select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    background-color: var(--v-primary-white);
    border: 1px solid var(--v-primary-text-light-neutral) !important;
    color: #333333;
    height: 32px;
}

.invalid-feedback {
    display: block;
    width: 100%;
    margin-top: 0.25rem;
    font-size: 0.75rem;
    color: #f1556c;
}

.multiple-select-input-wrapper {
    position: relative;
    display: block;
    width: 100%;
}

.multiple-select-input-wrapper::after {
    content: url("../assets/images/icons/arrow_drop_down.svg");
    width: 15px;
    height: 15px;
    position: absolute;
    top: 50%;
    right: 17px;
    transform: translateY(-50%);
    pointer-events: none;
}

.custom-select-wrapper select option:checked {
    color: #b8bcca;
}

.linear-loader {
    height: 2px;
    /* Adjust the height as needed */
    background-color: #b8bcca;
    /* Adjust the color as needed */
    width: 100%;
    position: relative;
    top: -2.5px;
    left: 0;
    right: 0;
    overflow: hidden;
}

.train {
    width: 900px;
    /* Adjust the train's width */
    height: 2px;
    /* Should match the height of the loader */
    background-color: #2f5bcf;
    /* Adjust the color as needed */
    position: absolute;
    animation: moveRight 1s linear infinite;
    /* Adjust the animation speed as needed */
    top: 0;
    left: 0;
}

@keyframes moveRight {
    0% {
        left: -50px;
        /* Start off the screen to the left */
    }

    100% {
        left: 100%;
        /* Move to the right of the screen */
    }
}

.required {
    color: red;
    margin-left: 2px;
    font-weight: bolder;
}

.label-helper {
    font-size: var(--font-size-body);
    color: var(--v-primary-accent);
    cursor: pointer;
}
</style>