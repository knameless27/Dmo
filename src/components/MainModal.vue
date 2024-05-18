<template>
    <div v-if="showModal" class="modal-container" @click="closeModalOutside">
        <MainCard @click.stop class="modal">
            <slot />
            <div v-if="defaultButton">
                <hr />
                <button class="b-block ptb-1 mb-1" @click="closeModal">Ok</button>
            </div>
        </MainCard>
    </div>
</template>

<script>
import MainCard from './MainCard.vue';

export default {
    components: {
        MainCard
    },
    props: {
        showModal: {
            type: Boolean,
            required: true,
        },
        defaultButton: {
            type: Boolean,
            required:false,
            default: true
        }
    },
    methods: {
        closeModal() {
            // Aquí puedes emitir un evento para indicar al componente padre que se cierre el modal
            this.$emit('close-modal', false);
        },
        closeModalOutside(event) {
            // Detiene la propagación del evento de clic fuera del modal
            event.stopPropagation();
            this.$emit('close-modal', false);
        }
    }
};
</script>

<style scoped>
.modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.modal {
    z-index: 1000;
    padding: 1vw;
}

button {
    margin-top: 10px;
    padding: 0.30vw;
}
</style>