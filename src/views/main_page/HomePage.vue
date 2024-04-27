<template>
    <main>
        <section class="first-view">
            <hgroup class="box">
                <h1>¡Transform your style right now!</h1>
                <p>
                    Our team of experts is ready to create your new image.
                </p>
                <button class="primary block" @click="bookApp">{{ $t("bookNow") }}!</button>
            </hgroup>
        </section>
        <section class="info">
            references or trabajos hechos
        </section>
        <section class="info">
            frequently asked questions
        </section>
        <section class="info">
            payment
        </section>
    </main>
</template>

<script>
export default {
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
    color: var(--primary);
    background-color: var(--bg-dark);
}

.box {
    height: 100%;
    color: var(--white);
    padding: 13% 0 0 3%;
    max-width: 450px;
    background-color: rgba(0, 0, 0, 0.767);
    box-shadow: 0px 0px 15px 58px rgba(0, 0, 0, 0.767);
}
</style>