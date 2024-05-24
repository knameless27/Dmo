<template>
    <Form @submit="onSubmitRegister" :schema="form" v-slot="{ errors }" style="padding-right: 1vw">
        <div class="container-form">
            <div class="mr-1">
                <MainInput class="ptb-1" type="text" title="Name" name="name" :errors="errors.name" rules="required" />
                <MainInput class="ptb-1" type="telephone" title="telephone" name="telephone" :errors="errors.telephone"
                    v-model="form.telephone" rules="required|integer|digits:10" />
                <MainInput class="ptb-1" type="text" title="Address" name="address" :errors="errors.address"
                    rules="required" />
                <MainInput class="ptb-1" type="password" title="Password" name="password" :errors="errors.password"
                    rules="required" />
                <MainInput class="ptb-1" v-if="time" type="time" title="Time" name="time" :errors="errors.time" rules="required" />
            </div>
            <div>
                <MainInput class="ptb-1" type="text" title="Lastname" name="lastname" :errors="errors.lastname"
                    rules="required" />
                <MainInput class="ptb-1" type="text" title="Identification" name="identification"
                    :errors="errors.identification" rules="required" />
                <MainInput class="ptb-1" title="Email" type="email" name="email" :errors="errors.email"
                    rules="required" />
                <MainInput class="ptb-1" type="password" title="Verify Password" name="verify_password"
                    :errors="errors.verify_password" rules="required" />
            </div>
        </div>
        <hr />
        <button class="b-block ptb-1 mb-1" type="submit" v-if="!loading">Register</button>
        <MainLoader v-else />
        <span>
            you already has an account? <a @click="goLogin">Login here!</a>
        </span>
    </Form>
</template>

<script>
import MainInput from "components/MainInput.vue"
import MainLoader from "@/components/MainLoader.vue"
import auth from "api/auth/index.js"
import { setToken } from "auth_store/main.js"
import { Form } from 'vee-validate';
import { validatePhone } from "mix/MainMixin.js"

export default {
    components: {
        MainInput,
        MainLoader,
        Form,
    },
    props: {
        time: {
            default: false,
            required: false,
            type: Boolean
        }
    },
    data() {
        return {
            form: {
                email: "",
                password: "",
                name: "",
                lastname: "",
                telephone: "",
                identification: "",
                address: "",
                time: "",
            },
            login: true,
            loading: false,
        }
    },
    methods: {
        goLogin() {
            this.$router.push('/login')
        },
        async onSubmitRegister(values) {
            this.auth("register", values)
        },
        auth(method, form) {
            if (method == 'register' && form.password != form.verify_password) return this.$toast.open({ message: "The password doesn't match", type: "info" });
            this.loading = !this.loading
            const newForm = { ...form }
            newForm.password = btoa(newForm.password)
            newForm.telephone = validatePhone(newForm.telephone)
            newForm.status = true
            newForm.verify_password = null
            auth[method](newForm).then(({ message, data, status }) => {
                this.loading = !this.loading
                if (!data.original) return this.$toast.open({ message: "unexpected error", type: "error" })
                this.$toast.open({ message, type: status });
                setToken(data.original)
                data.original.user.time = newForm.time
                this.$emit("successRegister", data.original.user)
            }).catch(() => {
                this.loading = !this.loading
                this.$toast.open({ message: "unexpected error", type: "error" });
            })
        }
    }
}
</script>

<style scoped>
.card {
    z-index: 1;
    margin-inline: auto;
    max-width: 30vw;
    display: flex;
    flex-direction: column;
    padding: 1vw;
}

.card-register {
    z-index: 1;
    padding-right: 3%;
    margin-right: 1vw;
    margin-inline: auto;
}

.container-form {
    min-width: 30vw;
    display: grid;
    grid-template-columns: auto auto;
    width: 100%;
}

.card>* {
    padding-bottom: 10px;
}

a {
    cursor: pointer;
}
</style>