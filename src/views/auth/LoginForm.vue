<template>
    <div class="mainContent">
        <div class="blur-background"></div>
        <MainCard class="card" title="Login" v-if="login">
            <MainInput class="ptb-1" title="Email" type="email" v-model="form.email" />
            <MainInput class="ptb-1" type="password" title="Password" v-model="form.password" />
            <hr />
            <button class="b-block ptb-1 mb-1" @click="auth('login')" v-if="!loading">Login</button>
            <MainLoader v-else/>
            <span>
                you don't have an account? <a @click="login = !login">Register here!</a>
            </span>
        </MainCard>
        <MainCard class="card-register" title="Register" v-else>
            <div class="container-form">
                <div class="mr-1">
                    <MainInput class="ptb-1" type="text" title="name" v-model="form.name" />
                    <MainInput class="ptb-1" type="telephone" title="telephone" v-model="form.telephone" />
                    <MainInput class="ptb-1" type="text" title="address" v-model="form.address" />
                    <MainInput class="ptb-1" type="password" title="Password" v-model="form.password" />
                </div>
                <div>
                    <MainInput class="ptb-1" type="text" title="lastname" v-model="form.lastname" />
                    <MainInput class="ptb-1" type="text" title="identification" v-model="form.identification" />
                    <MainInput class="ptb-1" title="Email" type="email" v-model="form.email" />
                    <MainInput class="ptb-1" type="password" title="Verify Password" v-model="form.verify_password" />
                </div>
            </div>
            <hr />
            <button class="b-block ptb-1 mb-1" @click="auth('register')" v-if="!loading">Register</button>
            <MainLoader v-else/>
            <span>
                you already has an account? <a @click="login = !login">Login here!</a>
            </span>
        </MainCard>
    </div>
</template>

<script>
import MainCard from "components/MainCard.vue"
import MainInput from "components/MainInput.vue"
import MainLoader from "@/components/MainLoader.vue"
import auth from "api/auth/index.js"

export default {
    components: {
        MainCard,
        MainInput,
        MainLoader
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
                status: true,
            },
            login: true,
            loading: false,
        }
    },
    methods: {
        auth(method) {
            if(method == 'register' && this.form.password != this.form.verify_password) return this.$toast.open({message: "The password doesn't match", type: "info"});
            this.loading = !this.loading
            const newForm = {...this.form}
            newForm.password = btoa(newForm.password)
            newForm.verify_password = null
            auth[method](newForm).then(({message, data, status}) => {
                this.$toast.open({message: message, type: status});
                console.log(data)
                this.loading = !this.loading
            }).catch(() =>{
                this.loading = !this.loading
                this.$toast.open({message: "unexpected error", type: "error"});
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