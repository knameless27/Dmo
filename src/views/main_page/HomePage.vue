<template>
    <main>
        <section class="first-view">
            <hgroup class="box">
                <h1>¡Transform your style right now!</h1>
                <p>
                    Our team of experts is ready to create your new image.
                </p>
                <button class="b-primary b-block" @click="bookApp()">{{ $t("bookNow") }}!</button>
            </hgroup>
        </section>
        <section class="references">
            <h1>References owo</h1>
            <div class="card-references">
                <MainCard
                    img="https://media.istockphoto.com/id/1438634414/photo/business-women-laptop-and-and-happy-team-in-office-for-web-design-collaboration-and-training.jpg?s=2048x2048&w=is&k=20&c=Pd7jf2xPKirZQuJmRWE_Va4bEtmy2crWz0p3L1wrDAM="
                    vertical title="waos">
                    waos 1
                </MainCard>
                <MainCard
                    img="https://media.istockphoto.com/id/687663822/photo/dentists-office-in-barcelona-medical-workers-portrait.jpg?s=2048x2048&w=is&k=20&c=pdEX8TuROxZSSzavdiNLYS9vrwvefBzXExFyEIStyw0="
                    vertical title="waos">
                    waos 2
                </MainCard>
                <MainCard
                    img="https://media.istockphoto.com/id/1371823812/photo/he-loves-making-his-clients-happy.jpg?s=2048x2048&w=is&k=20&c=KXvmgTjOjYQKLY8bVczYIsm-kTwrf5iAssYLmkjGXUk="
                    vertical title="waos">
                    waos 3
                </MainCard>
            </div>
        </section>
        <section class="info">
            <h1>frequently asked questions</h1>
            <MainDetails class="summaries" title="titulos">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellat eos eaque nesciunt. Sequi, aut amet sint explicabo ea a ad ratione adipisci tempora atque alias
                quis necessitatibus corporis itaque totam.</MainDetails>
            <MainDetails class="summaries" title="titulos">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam vel rerum ipsa officiis deleniti magni illo, molestias ea laborum voluptates autem eveniet
                corrupti. Illo dolor exercitationem corrupti, quibusdam magnam ipsa?</MainDetails>
            <MainDetails class="summaries" title="titulos">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam vel rerum ipsa officiis deleniti magni illo, molestias ea laborum voluptates autem eveniet
                corrupti. Illo dolor exercitationem corrupti, quibusdam magnam ipsa?</MainDetails>
        </section>
        <section class="find">
            <MainCard vertical title="You can find us here!">
                <div class="map" style="width: 600px; height: 300px; background-color: white"></div>
            </MainCard>
        </section>
        <section class="contact">
            <h1 class="contact-title">Contact us</h1>
            <MainCard vertical class="contact-form">
                <MainInput title="Subject" placeholder="write your assunt here!" v-model="subject" />
                <TextArea title="Message" rows="5" cols="33" placeholder="Write your message here!" />
                <button style="margin-top: 1%" class="b-block">send</button>
            </MainCard>
            <MainCard vertical title="About Us" class="info">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda sed illo ad, aut nam iste culpa
                molestiae corrupti rem minus voluptas quod totam beatae veritatis velit at, fuga temporibus!
                Voluptates!
            </MainCard>
        </section>
    </main>
</template>

<script>
import MainCard from '@/components/MainCard.vue';
import MainDetails from '@/components/MainDetails.vue';
import MainInput from '@/components/MainInput.vue';
import TextArea from '@/components/TextArea.vue';

export default {
    components: {
        MainCard,
        MainDetails,
        MainInput,
        TextArea
    },
    data() {
        return {
            subject: ""
        }
    },
    methods: {
        bookApp() {
            this.$router.push("/book_appointment")
        }
    }
}
</script>

<style scoped>
.first-view {
    height: 93vh;
    display: flex;
    flex-direction: column;
    mask-image: linear-gradient(black 80%, transparent);
    background-image: url(https://media.istockphoto.com/id/1413761479/photo/mature-couple-meeting-financial-advisor-for-investment.jpg?s=2048x2048&w=is&k=20&c=mpJmfSm7tNnRjywH5LZ6RGicYSBgC1J0iulyIN-DeDU=);
}

.info {
    color: var(--white);
    background-color: var(--bg-dark);
    margin: 1%;
}

.box {
    height: 100%;
    color: var(--white);
    padding: 13% 0 0 3%;
    max-width: 450px;
    background-color: rgba(0, 0, 0, 0.767);
    box-shadow: 0px 0px 15px 58px rgba(0, 0, 0, 0.767);
}

.references h1 {
    margin-left: 1%;
}

.card-references {
    display: flex;
    justify-content: center;
    gap: 2%;
    align-items: center;
}

.summaries {
    margin-top: 1%;
}

.find {
    margin: 1%;
    padding-top: 3%;
}

.contact-title {
    grid-area: title;
}

.contact {
    margin: 1%;
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr 1fr;
    /* Dos columnas iguales */
    grid-template-areas:
        "title title"
        "contact-form info";
}

.contact-form {
    display: flex;
    flex-direction: column;
    grid-area: contact-form;
}

.info {
    grid-area: info;
}
</style>