<!-- CheckboxComponent.vue -->
<template>
    <div>
        <p class="label" v-if="label">
            {{ label }}
        </p>
        <input type="checkbox" :id="id" v-model="isChecked" class="mr-1" @input="$emit('update:modelValue', $event.target.checked)">
        <label :for="id" class="checkbox-label">{{ checkboxLabel }}</label>
    </div>
</template>

<script>
import {ref, watch} from "vue";

export default {
    props: {
        id: {
            type: String,
            required: true,
        },
        label: {
            type: String,
        },
        checkboxLabel: {
            type: String,
            default: 'Yes/No',
        },
        modelValue: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        let isChecked = ref(false);

        watch(props, (newProps) => {
            isChecked.value = newProps.modelValue;
        });

        return {
            isChecked,
        };
    },
};
</script>