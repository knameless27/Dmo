<template>
    <div class="__input-layout">
        <b v-if="title">{{ title }}</b>
        <div class="__input-main">
            <input :type="validateType()" :placeholder="placeholder" :value="tempValue"
                @input="$emit('update:modelValue', $event.target.value)">
            <Icon :style="`display: ${layoutButton}; font-size: 200px`" v-if="type == 'password'" icon="mdi:eye"
                @click="seePassword" />
        </div>
    </div>
</template>
<script>
import { Icon } from '@iconify/vue';

export default {
    components: {
        Icon
    },
    props: {
        title: {
            default: "",
            required: false,
            type: String
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
            tempValue: "",
            layoutButton: this.type == "password" ? "" : "none"
        }
    },
    watch: {
        pwdBool() {
            this.validateType()
        },
        modelValue() {
            this.tempValue = this.modelValue
        }
    },
    methods: {
        seePassword() {
            this.pwdBool = !this.pwdBool
        },
        validateType() {
            if (this.type != 'password') return this.type
            if (this.pwdBool) {
                this.tempValue = this.modelValue
                this.$emit('update:modelValue', this.tempValue)
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
    align-items: center;
}

.__input-main input {
    flex: 1;
    /* El input ocupa todo el espacio disponible */
}

.__input-main button {
    margin-left: 15px;
    /* Espacio entre el input y el botón */
}
</style>