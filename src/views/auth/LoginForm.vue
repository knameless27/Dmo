<template>
    <div class="mainContent">
        <div class="blur-background"></div>
        <MainCard class="card" title="Login" v-if="login">
            <Form @submit="onSubmitLogin" :schema="form" v-slot="{ errors }">
                <MainInput class="ptb-1" title="Email" type="email" :errors="errors.email" name="email"
                    rules="required|email" />
                <MainInput class="ptb-1" type="password" title="Password" :errors="errors.password" name="password"
                    rules="required" />
                <hr />
                <button class="b-block ptb-1 mb-1" type="submit" v-if="!loading">Login</button>
                <MainLoader v-else />
                <span>
                    you don't have an account? <a @click="login = !login">Register here!</a>
                </span>
            </Form>
        </MainCard>
        <MainCard class="card-register" title="Register" v-else>
            <Form @submit="onSubmitRegister" :schema="form" v-slot="{ errors }">
                <div class="container-form">
                    <div class="mr-1">
                        <MainInput class="ptb-1" type="text" title="Name" name="name" :errors="errors.name"
                            rules="required" />
                        <MainInput class="ptb-1" type="telephone" title="telephone" name="telephone"
                            :errors="errors.telephone" v-model="form.telephone" rules="required|integer|digits:10" />
                        <MainInput class="ptb-1" type="text" title="Address" name="address" :errors="errors.address"
                            rules="required" />
                        <MainInput class="ptb-1" type="password" title="Password" name="password"
                            :errors="errors.password" rules="required" />
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
                    you already has an account? <a @click="login = !login">Login here!</a>
                </span>
            </Form>
        </MainCard>
    </div>
</template>

<script>
import MainCard from "components/MainCard.vue"
import MainInput from "components/MainInput.vue"
import MainLoader from "@/components/MainLoader.vue"
import auth from "api/auth/index.js"
import { userCreds } from "auth_store/main.js"
import { Form } from 'vee-validate';
import { validatePhone } from "mix/MainMixin.js"

export default {
    components: {
        MainCard,
        MainInput,
        MainLoader,
        Form,
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
            },
            login: true,
            loading: false,
            Store: userCreds()
        }
    },
    methods: {
        async onSubmitLogin(values) {
            this.auth("login", values)
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
                this.$toast.open({ message, type: status });
                this.loading = !this.loading
                if (!data.original) return this.$toast.open({ message: "unexpected error", type: "error" })
                this.Store.newCreds(data.original)
                this.$router.push('/book_appointment')
            }).catch(() => {
                this.loading = !this.loading
                this.$toast.open({ message: "unexpected error", type: "error" });
            })
        }
    }
}
</script>

<style scoped>
.mainContent {
    display: flex;
    align-items: center;
    justify-content: center;
}

.blur-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("https://media.istockphoto.com/id/904172104/photo/weve-made-it-all-this-way-i-am-proud.jpg?s=2048x2048&w=is&k=20&c=-LxW7cVAGkmC3pMPdvVuHBSRTBmlpFRzlNjw0qLsJUk=");
    background-size: cover;
    background-position: center;
    z-index: -1;
}

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
    padding: 1vw;
    padding-right: 3%;
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