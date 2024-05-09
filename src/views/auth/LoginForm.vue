<template>
    <div class="mainContent">
        <div class="blur-background"></div>
        <MainCard class="card" title="Login">
            <MainInput class="ptb-1" title="Email" type="email" v-model="form.email" />
            <MainInput class="ptb-1" type="password" title="Password" v-model="form.password" />
            <hr />
            <button class="b-block ptb-1">Login</button>
            <span class="ptb-1">
                you doesn't already an account, <a href="">Register here</a>
            </span>
        </MainCard>
    </div>
</template>

<script>
import MainCard from "components/MainCard.vue"
import MainInput from "components/MainInput.vue"

export default {
    components: {
        MainCard,
        MainInput
    },
    data() {
        return {
            form: {
                email: "",
                password: ""
            }
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
    filter: blur(10px);
    background-position: center;
    z-index: -1;
}

.card {
    z-index: 1;
    margin-inline: auto;
    max-width: 30vw;
    display: flex;
    flex-direction: column;
}

.card>* {
    padding-bottom: 10px;
    /* Ajusta el valor según el espacio deseado */
}
</style>