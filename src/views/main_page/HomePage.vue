<template>
    <main>
        <section class="first-view">
            <hgroup class="box">
                <h1>¡Transform your style right now!</h1>
                <p>
                    Our team of experts is ready to create your new image.
                </p>
                <button class="b-primary b-block" @click="bookApp">{{ $t("bookNow") }}!</button>
            </hgroup>
        </section>
        <section class="references">
            <h1>References owo</h1>
            <div class="card-references">
                <MainCard img="https://m.media-amazon.com/images/I/41510HcTISL._UXNaN_FMjpg_QL85_.jpg" vertical
                    title="waos">
                    waos 1
                </MainCard>
                <MainCard img="https://m.media-amazon.com/images/I/41510HcTISL._UXNaN_FMjpg_QL85_.jpg" vertical
                    title="waos">
                    waos 2
                </MainCard>
                <MainCard img="https://m.media-amazon.com/images/I/41510HcTISL._UXNaN_FMjpg_QL85_.jpg" vertical
                    title="waos">
                    waos 3
                </MainCard>
            </div>
        </section>
        <section class="info">
            <h1>frequently asked questions</h1>
            <MainDetails class="summaries" title="titulos">content</MainDetails>
            <MainDetails class="summaries" title="titulos">content</MainDetails>
            <MainDetails class="summaries" title="titulos">content</MainDetails>
        </section>
        <section class="contact">
            <h1>You can find us here!</h1>
            <div class="map" style="width: 600px; height: 300px; background-color: white"></div>
        </section>
        <section class="contact">
            <h1>Contact us</h1>
            <input type="text" placeholder="Subject">
            <input type="text" placeholder="Write your message here">
            <button>send</button>
        </section>
    </main>
</template>

<script>
import MainCard from '@/components/MainCard.vue';
import MainDetails from '@/components/MainDetails.vue';

export default {
    components: {
        MainCard,
        MainDetails
    },
    data() {
        return {
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
    z-index: -1;
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
    padding-top: 3%;
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

.contact {
    margin: 1%;
    padding-top: 3%;
}
</style>