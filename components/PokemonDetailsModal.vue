<script setup>
	import PokemonTypes from './PokemonTypes.vue';
    import { VueFinalModal } from 'vue-final-modal';
    import LoadingOverlay from 'vue-loading-overlay';
    import { handleImgError } from '~/utils/imageErrorHandler';

    const isLoading = ref(true);
    const imagesToLoad = ref(0);
    const imagesLoaded = ref(0);
    const showAudio = ref(true);

    const props = defineProps({
        activePokemon: { 
            type: Object,
            required: true
        },
        imgSrcDefault: {
            type: String,
            required: true
        },
        imgSrcShiny: {
            type: String,
            required: true
        },
        fallbackDefault: {
            type: Boolean,
            required: true
        },
        fallbackShiny: {
            type: Boolean,
            required: true
        },
        onImgError: {
            type: Function,
            required: true
        }
    });

    /**
     * Events emited:
     * @event closeModal - when the user click the button, emit the close action 
     * @event onImgError - emits when a loading image return error.
     *   @param {string} type - the type of the image ('icon', 'default', 'shiny').
     *   @param {object} pokemon - the pokémon object the error refers to.
     */

    const emit = defineEmits(['closeModal']);

    watch(() => props.activePokemon, () => {
        isLoading.value = true;
        imagesLoaded.value = 0;
        imagesToLoad.value = (!props.fallbackDefault ? 1 : 0) + (!props.fallbackShiny ? 1 : 0)
        if (imagesToLoad.value === 0) {
            isLoading.value = false
        }
    }, { immediate: true })

    function onAudioError() {
        showAudio.value = false;
    }

    function onImgLoad() {
        imagesLoaded.value++
        if (imagesLoaded.value >= imagesToLoad.value) {
            isLoading.value = false
        }
    }
</script>

<template>
    <VueFinalModal
        class="confirm-modal"
        content-class="confirm-modal-content"
        overlay-transition="vfm-fade"
        content-transition="vfm-fade">
        <div ref="detailAnimate" class="c-pokemon-details-mob">
            <div 
                v-if="activePokemon" :key="activePokemon.id"
                class="c-pokemon-details-mob__container">
                <LoadingOverlay :active="isLoading" :is-full-page="false" loader="dots" color="#00DC82" background-color="#FFFACD" :opacity="1" :z-index="1500"/>
                <div class="c-pokemon-details-mob__info">
                    <h2>{{ activePokemon.name }}</h2>
                    <PokemonTypes
                        :activePokemon="activePokemon"
                    />
                </div>
                <p>Pokémon No. {{ activePokemon.id }}</p>
                <div class="c-pokemon-details-mob__images">
                    <div class="default-image">
                        <p style="margin-bottom: 0;">Default:</p>
                        <NuxtImg 
                            v-if="!fallbackDefault"
                            :src="imgSrcDefault"
                            :alt="activePokemon.name + ' default image'"
                            placeholder
                            loading="lazy"
                            role="img"
                            @load="onImgLoad"
                            @error="() => handleImgError('default', activePokemon && activePokemon.id ? activePokemon : null, emit)"
                        />
                        <img 
                            v-else :src="activePokemon.defaultImg"
                            :alt="activePokemon.name + ' default image'"
                            loading="lazy"
                            role="img"
                        >
                    </div>
                    <div class="shiny-image">
                        <p style="margin-bottom: 0;">Shiny:</p>
                        <NuxtImg 
                            v-if="!fallbackShiny"
                            :src="imgSrcShiny"
                            :alt="activePokemon.name + ' shiny image'"
                            placeholder
                            loading="lazy"
                            role="img"
                            @load="onImgLoad"
                            @error="() => handleImgError('shiny', activePokemon && activePokemon.id ? activePokemon : null, emit)"
                        />
                        <img 
                            v-else :src="activePokemon.shinyImg"
                            :alt="activePokemon.name + ' shiny image'"
                            loading="lazy"
                            role="img"
                        >
                    </div>
                </div>
                <p>{{activePokemon.flavor_text}}</p>
                <div v-if="showAudio" class="c-pokemon-details-mob__cry">
                    <p>{{activePokemon.name}} cry:</p>
                    <audio
                        ref="audioRef"
                        controls
                        @error="onAudioError">
                        <source :src="activePokemon.cryOgg" type="audio/ogg" />
                        <source :src="activePokemon.cryMp3" type="audio/mp3" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
                <p v-else>No audio found</p>
                <button type="button" class="c-pokemon-details-mob__button" @click="emit('closeModal')">Close</button>
            </div>
        </div>
    </VueFinalModal>
</template>

<style lang="scss">

.c-pokemon-details-mob {
    width: 100%;
    background-color: #FFFACD;
    height: 95dvh;
    padding: 5%;
    box-shadow: 0 2px 8px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    &__container {
        overflow: auto;
        height: 100%;
        position: relative;
    }
    &__info {
        display: flex;
        h2 {
            text-transform: capitalize;
            font-size: clamp(10px, 6vw, 32px);
            margin: 0;
            width: max-content;
        }
    }
    
    &__cry {
        text-transform: capitalize;
        font-size: clamp(8px, 4vw, 16px);
    }
    &__images {
        display: flex;
        flex-direction: row;
        gap: 10%;
        img {
            width: 100px;
            height: auto;
            margin-bottom: 20px;
        }
    }
    &__button {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 48px;
        background-color: #b7ecff;
        border: 1px solid #4bbaff ;
        color: #000;
        border-radius: 15px;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
        font-size: 16px;
        width: 50%;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: 0 auto 16px auto;
    }
    audio {
        min-height: 40px;
    }
}
</style>