<template>
    <div class="__input-layout">
        <b v-if="title">{{ title }}</b>
        <div class="__input-main">
            <input :type="validateType()" :placeholder="placeholder" :value="tempValue"
                @input="$emit('update:modelValue', $event.target.value)">
            <Icon :style="`display: ${layoutButton}; font-size: 200px; cursor: pointer`" v-if="type == 'password'" icon="mdi:eye"
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
    computed: {
        tempValue: {
            get() {
                let phone = this.phone;
                if (phone && this.type == "telephone") {
                    phone = phone.toString().replace(/\D/g, "");
                    const match = phone.match(/^(\d{1,3})(\d{0,3})(\d{0,4})$/);
                    if (match) {
                        phone = `(${match[1]}${match[2] ? "" : ""}) ${match[2]}${match[3] ? "-" : ""
                            }${match[3]}`;
                    }
                }
                return phone;
            },
            set(val) {
                this.phone = val;
            },
        },
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