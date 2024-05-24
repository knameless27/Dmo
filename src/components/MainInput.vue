<template>
    <div class="__input-layout">
        <b v-if="title">{{ title }}</b>
        <div class="__input-main">
            <Field :ref="`${title}-input`" :type="validateType()" :name="name" :value="phone"
                @input="$emit('update:modelValue', $event.target.value)" :rules="rules" />
            <small class="text-danger">{{ errors }}</small>
            <div v-if="type == 'password'">
                <input type="checkbox" @click="seePassword" /><label>Show password</label>
            </div>
        </div>
    </div>
</template>
<script>
import { Field } from 'vee-validate';

export default {
    components: {
        Field
    },
    props: {
        title: {
            default: "",
            required: false,
            type: String
        },
        name: {
            default: "",
            required: false,
            type: String
        },
        rules: {
            default: "",
            required: false,
            type: String
        },
        errors: {
            type: String,
            required: false,
        },
        type: {
            default: "text",
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
    emits: ["emit:modelValue"],
    data() {
        return {
            pwdBool: false,
            phone: "",
            layoutButton: this.type == "password" ? "" : "none"
        }
    },
    watch: {
        pwdBool() {
            this.validateType()
        },
        modelValue() {
            this.phone = this.modelValue
        }
    },
    methods: {
        seePassword() {
            this.pwdBool = !this.pwdBool
        },
        validateType() {
            if (this.type != 'password') return this.type
            if (this.pwdBool) {
                this.phone = this.modelValue
                this.$emit('update:modelValue', this.phone)
                return 'text'
            }
            return this.type
        }
    }
}
</script>
<style scoped>
.__input-layout {
    display: flex;
    flex-direction: column;
}

.__input-main {
    display: flex;
    flex-direction: column;
}

.__input-main input {
    flex: 1;
}
</style>