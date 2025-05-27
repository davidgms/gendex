<script setup>
import { ref, onMounted } from 'vue';
import autoAnimate from "@formkit/auto-animate";
import LoadingOverlay from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

useHead({
    meta: [
        {
            name: 'description',
            content: 'GenDex is a generation-based Pokédex built with Nuxt 3 and PokéAPI. Select a generation to explore and search for Pokémon!'
        }
    ]
})

const isLoading = ref(true)
const generations = ref(null);
const animateBlock = ref();
const GendexHeader = defineAsyncComponent(() => import('~/components/GendexHeader.vue'));

onMounted(async () => {
    try {
        const data = await $fetch(`https://pokeapi.co/api/v2/generation/`);
        generations.value = data.results;
    } catch (error) {
        if (error.reponse && error.response.status == 404) {
            router.replace('/not-found');
        } else {
            router.replace('/error');
        }
        console.error('API fetching error:', error);
    }
    isLoading.value = false;
    autoAnimate(animateBlock.value);
});
</script>

<template>
    <div>
        <LoadingOverlay :active="isLoading" :is-full-page="true" color="#019e5e" :opacity="0.9" />
        <div class="c-generation-selection">
            <GendexHeader/>
            <h2 class="c-generation-selection__subtitle">Select one generation:</h2>
            <div ref="animateBlock" class="c-generation-selection__gen-section">
                <!-- Itera sobre as gerações e cria um bloco para cada uma -->
                <div
                    v-for="(generation, index) in generations" :key="'generation-' + index"
                    class="c-generation-selection__gen-block">
                    <NuxtLink 
                        :to="`/generation/${index + 1}`"
                        class="c-generation-selection__gen-card" 
                        :aria-label="`Go to generation ${index + 1}`">
                        <img
                            :src="`/pokemon-games/gen-${index + 1}.webp`"
                            :alt="generation.name + ' game image' || 'game image'"
                            class="c-generation-selection__gen-image"
                            role="img"
                        >
                        <p>{{ formatGenerationName(generation.name) || '' }}</p>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.c-generation-selection {
    height: 100%;
    padding-bottom: 2%;
    background: linear-gradient(180deg,rgba(255, 255, 255, 0.5) 0%, rgba(0, 220, 128, 0.397) 100%);
    &__subtitle {
        text-align: center;
        font-size: clamp(22px, 2vw, 28px);
        margin-top: 2%;
        margin-bottom: 0;
    }
    &__gen-section {
        width: 100%;
        display: flex;
        gap: 20px;
        justify-content: center;
        align-items: center;
        padding: 2% 7% 0 7%;
        flex-wrap: wrap;
    }
    &__gen-block {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 25%;
        max-width: 25%;
        height: 100%;
        scale: 95%;
        padding: 5px;
        transition: scale 0.25s cubic-bezier(0.4, 0.2, 0.2, 1); // animação suave
        &:hover{
            scale: 100%;
        }
    }
    &__gen-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        width: 100%;
        max-width: 80%;
        text-align: center;
        background-color: #f9f9f9;
        text-decoration: none;
        height: 100%;
        background: #FFF;
        border-radius: 20px;
        border:1px solid rgba(255, 255, 255, 0.18);
        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        min-height: 200px;
        p {
            font-size: clamp(16px, 2vw, 25px);
            margin: 10px 0;
        }
    }
    &__gen-image {
        width: 275px;
        max-width: 100%;
        height: 190px;
        max-height: 200px;
        object-fit: contain;
    }

}
@media (max-width: 600px) {
    .c-generation-selection {
        &__gen-section {
            gap: 0;
        }
        &__gen-block {
            flex: 0 0 50%;
            max-width: 50%;
            margin-bottom: 15px;
            scale: 95%;
        }
        &__gen-card {
            max-width: 90%;
            min-height: 180px;
        }
        &__gen-image {
            width: 108px;
            max-width: 100%;
            height: 118px;
            max-height: 125px;
        }
    }
}

</style>