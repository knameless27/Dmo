<template>
    <div style="display: flex; flex-direction: column">
        <b v-if="title">{{ title }}</b>
        <input type="text" :placeholder="placeholder" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
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
        modelValue: {
            default: "",
            required: false,
            type: String
        },
    },
    emits: ["emit:modelValue"]
}
</script>