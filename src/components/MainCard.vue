<template>
    <div class="_card">
        <img :src="img" v-if="img">
        <div class="_layout-text">
            <h1 v-if="title">{{title}}</h1>
            <slot />
        </div>
    </div>
</template>
<script>
export default {
    props:{
        img: {
            required: false,
            type: String,
            default: ""
        },
        title: {
            required: false,
            type: String,
            default: ""
        },
        vertical: {
            required: true,
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            layout: this.vertical ? "grid" : "flex",
            fullWidthImg: this.vertical ? "100%" : "auto",
            radiusImg: this.vertical ? "15px 15px 0px 0px" : "15px 0px 0px 15px"
        }
    }
}
</script>
<style scoped>
._card {
    background-color: var(--bg-card);
    color: var(--white);
    display: v-bind(layout);
    border: 1px solid var(--primary);
    border-radius: 15px 15px 15px 15px;
}

._card img {
    width: v-bind(fullWidthImg);
    max-width: 500px;
    border-radius: v-bind(radiusImg);
}

._layout-text {
    justify-content: start;
    align-items: start;
    padding-inline: 3%;
    padding-bottom: 2%;
    margin-top: 1%;
}
</style>