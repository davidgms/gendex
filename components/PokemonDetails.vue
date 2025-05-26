<script setup>
    import PokemonTypes from './PokemonTypes.vue';
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
        }
    });

    /**
     * Events emited:
     * @event onImgError - emits when a loading image return error.
     *   @param {string} type - the type of the image ('icon', 'default', 'shiny').
     *   @param {object} pokemon - the pokémon object the error refers to.
     */

    const emit = defineEmits(['onImgError']);

    // 
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
    <div ref="detailAnimate" class="c-pokemon-details-desk">
        <div 
            v-if="activePokemon"
            :key="activePokemon.id"
            class="c-pokemon-details-desk__container">
            <LoadingOverlay :active="isLoading" :is-full-page="false" loader="dots" color="#00DC82" background-color="#FFFACD" :opacity="1" :z-index="900"/>
            <div class="c-pokemon-details-desk__info">
                <h2>{{ activePokemon.name }}</h2>
                <PokemonTypes
                    :activePokemon="activePokemon"
                />
            </div>
            <p>Pokémon No. {{ activePokemon.id }}</p>
            <div class="c-pokemon-details-desk__images">
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
                        v-else 
                        :src="activePokemon.defaultImg" 
                        :alt="activePokemon.name + ' default image'" 
                        loading="lazy"
                        role="img"
                        @load="onImgLoad"
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
                        v-else 
                        :src="activePokemon.shinyImg" 
                        :alt="activePokemon.name + ' shiny image'" 
                        loading="lazy"
                        role="img"
                        @load="onImgLoad"
                    >
                </div>
            </div>
            <p>{{activePokemon.flavor_text}}</p>
            <div v-if="showAudio" class="c-pokemon-details-desk__cry">
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
        </div>
    </div>
</template>

<style scoped lang="scss">
    .c-pokemon-details-desk {
        width: 50%;
        background-color: #FFFACD;
        height: 70dvh;
        padding: 3%;
        box-shadow: 0 2px 8px;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        position: relative;
        &__container {
            overflow: auto;
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
            margin-bottom: 16px;
            img {
                width: 100%;
                height: 100px;
            }
        }
        audio {
            min-height: 40px;
        }
    }
</style>