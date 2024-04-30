<template>
    <div style="display: flex; flex-direction: column">
        <b v-if="title">{{ title }}</b>
        <textarea type="text" :rows="rows" :columns="columns" :placeholder="placeholder" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
    </div>
</template>
<script>
export default {
    props: {
        title: {
            default: "",
            required: false,
            type: String
        },
        placeholder: {
            default: "",
            required: false,
            type: String
        },
        rows: {
            default: 1,
            required: false,
            type: Number
        },
        columns: {
            default: 1,
            required: false,
            type: Number
        },
        modelValue: {
            default: "",
            required: false,
            type: String
        },
    },
    emits: ["emit:modelValue"]
}
</script>