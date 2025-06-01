<script setup>
    import { ref, onMounted, computed, watch, defineAsyncComponent } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import autoAnimate from "@formkit/auto-animate";
    import { useNuxtApp } from '#app';
    import { useModal } from 'vue-final-modal';
    import LoadingOverlay from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/css/index.css';
    import { usePokemonApi } from "../../composables/usePokemonApi.js";

    useHead({
        meta: [
            {
                name: 'description',
                content: 'Switch between all Pokémon generations, search Pokémons by name ou number, visualize Pokémon details, images and more!'
            }
        ]
    })
    
    const { fetchFlavorText, fetchPokemonTypes, fetchGeneration } = usePokemonApi();
    const { $viewport } = useNuxtApp()
    const route = useRoute();
    const router = useRouter();
    const generationId = route.params.id;
    const isLoading = ref(true);

    const generation = ref({});
    const allGenerations = ref({});
    const genPokemonList = ref([]);
    const activePokemon = ref({});

    const PokemonList = defineAsyncComponent(() => import('~/components/PokemonList.vue'));
    const PokemonDetails = defineAsyncComponent(() => import('~/components/PokemonDetails.vue'));
    const PokemonDetailsModal = defineAsyncComponent(() => import('~/components/PokemonDetailsModal.vue'));
    const GendexHeader = defineAsyncComponent(() => import('~/components/GendexHeader.vue'));
    const GenerationsPagination = defineAsyncComponent(() => import('~/components/GenerationsPagination.vue'));

    const audioRef = ref(null);
    const searchQuery = ref('');
    const detailAnimate = ref(null);

    const fallbackDefault = ref(false);
    const fallbackShiny = ref(false);
    const iconsLoaded = ref(0);
    const allIconsLoaded = ref(false);
    
    const currentId = computed(() => Number(generationId));
    const nextId = computed(() => currentId.value + 1);
    const prevId = computed(() => currentId.value - 1);
    const imgSrcDefault = ref('');
    const imgSrcShiny = ref('');

    const filteredPokemonList = computed(() => {
        if (!searchQuery.value) {
            return genPokemonList.value; 
        } else {
            return genPokemonList.value.filter((pokemon) => {
                const query = searchQuery.value.toLowerCase();
                return (
                    pokemon.name.toLowerCase().includes(query) || pokemon.id.toString().includes(query) 
                );
            });
        }
    });

    watch(activePokemon, () => {
        if (audioRef.value) {
            audioRef.value.load();
        }
    });
    
    watch(activePokemon, (pokemon) => {
        if (pokemon && (pokemon.defaultGif || pokemon.defaultImg)) {
            imgSrcDefault.value = pokemon.defaultGif || pokemon.defaultImg || '';
            fallbackDefault.value = false;
        } else {
            imgSrcDefault.value = '';
            fallbackDefault.value = true;
        }
        if (pokemon && (pokemon.shinyGif || pokemon.shinyImg)) {
            imgSrcShiny.value = pokemon.shinyGif || pokemon.shinyImg || '';
            fallbackShiny.value = false;
        } else {
            imgSrcShiny.value = '';
            fallbackShiny.value = true;
        }
    });

    watch(filteredPokemonList, (newList) => {
        iconsLoaded.value = 0;
        allIconsLoaded.value = false;
        // marcar todos os icones pokémons como não carregados
        newList.forEach(p => { p.iconErrored = false; });
    });

    function onImgError(type = 'default', pokemon = null) {
        if (type === 'icon' && pokemon) {
            pokemon.iconErrored = true;
            setTimeout(onIconLoad, 0);
        } else if (!activePokemon.value) {
            return;
        } else if (type === 'shiny' && !fallbackShiny.value) {
            imgSrcShiny.value = activePokemon.value.shinyImg;
            fallbackShiny.value = true;
        } else if (type === 'default' && !fallbackDefault.value) {
            imgSrcDefault.value = activePokemon.value.defaultImg;
            fallbackDefault.value = true;
        }
    }

    function onIconLoad() {
        iconsLoaded.value++;
        if (iconsLoaded.value >= filteredPokemonList.value.length) {
            allIconsLoaded.value = true;
        }
    }

    const changeActivePokemon = (id) => {
        const pokemon = genPokemonList.value.find((pokemon) => pokemon.id === id);
        if ($viewport.isLessThan('tablet')) {
            activePokemon.value = pokemon
            open();
        } else {
            activePokemon.value = pokemon;
        }
    };

    const { open, close } = useModal({
        component: PokemonDetailsModal,
        attrs: {
            activePokemon: activePokemon,
            imgSrcDefault: imgSrcDefault,
            imgSrcShiny: imgSrcShiny,
            fallbackDefault: fallbackDefault,
            fallbackShiny: fallbackShiny,
            onCloseModal() {
                close();
            },
            onImgError: () => {
                onImgError('default', activePokemon.value);
                onImgError('shiny', activePokemon.value);
            },
        }
    })

    onMounted(async () => {
        try {
            const allGens = await $fetch(`https://pokeapi.co/api/v2/generation/`);
            allGenerations.value = allGens;
            
            const totalGenerations = allGens.count
            const generationIdNum = Number(generationId)
            if (isNaN(generationIdNum) || generationIdNum < 1 || generationIdNum > totalGenerations) {
                router.replace('/not-found');
                return
            }
            
            const genData = await fetchGeneration(generationId);
            generation.value = genData;

            const pokemonDetails = await Promise.all(
                genData.pokemon_species.map(async (species) => {
                    const id = parseInt(species.url.split('/').filter(Boolean).pop());
                    const flavorText = await fetchFlavorText(id);
                    const pokemonType = await fetchPokemonTypes(id);

                    return {
                        id,
                        name: species.name,
                        cryOgg: `https://play.pokemonshowdown.com/audio/cries/${species.name.replace('-', '')}.ogg`,
                        cryMp3: `https://play.pokemonshowdown.com/audio/cries/${species.name.replace('-', '')}.mp3`,
                        flavor_text: flavorText,
                        defaultImg: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
                        defaultGif: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`,
                        icon: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${id}.png`,
                        shinyImg: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`,
                        shinyGif: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/shiny/${id}.gif`,
                        iconErrored: false,
                        types: pokemonType
                    };
                })
            );

            genPokemonList.value = pokemonDetails.sort((a, b) => a.id - b.id);
            iconsLoaded.value = 0;
            allIconsLoaded.value = false;

            activePokemon.value = genPokemonList.value.find((pokemon) => pokemon.id === 1) || genPokemonList.value[0];
            if (detailAnimate.value) {
                autoAnimate(detailAnimate.value);
            }
        } catch (error) {
            if (error.reponse && error.response.status == 404) {
                router.replace('/not-found');
            } else {
                router.replace('/error');
            }
            console.log('Error on page /generation/' + generationId + ':', error);
        }
        isLoading.value = false
    });
</script>

<template>
    <div>
        <LoadingOverlay :active="isLoading" :is-full-page="true" color="#00DC82" :opacity="0.9" :z-index="1500" />
        <GendexHeader 
            :generationName="generation.name || ''" 
            :genPokemonListLength="genPokemonList.length">
        </GendexHeader>

        <div class="c-generation-page">
            <GenerationsPagination v-if="allGenerations && typeof allGenerations.count === 'number'"
                :count="allGenerations.count" 
                :currentId="currentId">
            </GenerationsPagination>
    
            <div class="c-generation-page__pokedex-block">
                <PokemonList 
                    :filteredPokemonList="filteredPokemonList"
                    :activePokemon="activePokemon"
                    v-model:searchQuery="searchQuery"
                    @changeActivePokemon="changeActivePokemon"
                    @onImgError="onImgError">
                </PokemonList>
    
                <PokemonDetails v-if="$viewport.isGreaterOrEquals('tablet') && (activePokemon && imgSrcDefault !== undefined)"
                    :activePokemon="activePokemon"
                    :imgSrcDefault="imgSrcDefault"
                    :imgSrcShiny="imgSrcShiny"
                    :fallbackDefault="fallbackDefault"
                    :fallbackShiny="fallbackShiny"
                    @onImgError="onImgError">
                </PokemonDetails>
            </div>
    
            <div class="c-generation-page__gen-controls">
                <NuxtLink v-if="nextId <= allGenerations.count"
                        :to="'/generation/' + nextId"
                        class="c-generation-page__gen-control-next"
                        aria-label="Go to next generation"
                        role="button">
                    <Icon name="iconamoon:arrow-right-6-circle-fill" size="2em" aria-hidden="true"/>
                </NuxtLink>
                <NuxtLink v-if="prevId >= 1"
                        :to="'/generation/' + prevId"
                        class="c-generation-page__gen-control-prev"
                        aria-label="Go to previous generation"
                        role="button">
                    <Icon name="iconamoon:arrow-left-6-circle-fill" size="2em" aria-hidden="true"/>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.c-generation-page {
    min-height: calc(100dvh - 108px);   
    background: linear-gradient(180deg,rgba(255, 255, 255, 0.5) 0%, rgba(0, 220, 128, 0.397) 100%);
    position: relative;
    display: flex;
    flex-direction: column;
    &__pokedex-block {
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 3% 7% 0 7%;
        gap: 20px;
    }
    &__gen-controls {
        a {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            opacity: .9;
            padding: 0;
            text-align: center;
            transition-behavior: normal;
            transition-duration: 0.15s;
            transition-timing-function: ease;
            transition-delay: 0s;
            transition-property: opacity;
            font-size: 2em;
            z-index: 1;
            width: 7%;
            opacity: 0.5;
            bottom: 0;
            top: 0;
            span {
                color: #000;
            }
            &:hover {
                span {
                    color: #019e5e;
                    opacity: 1;
                }
            }
        }
    }
    &__gen-control-next {
        right: 0;
    }
    &__gen-control-prev {
        left: 0;
    }
}

@media (max-width: 768px) {
    .c-generation-page {
        min-height: calc(100dvh - 94px); 
        &__pokedex-block {
            gap: 0;
            margin-top: 20px;
        }
        &__gen-controls {
            a {
                top: 3%;
                width: 10%;
                height: max-content;
            }
        }
        &__gen-control-next {
            right: 3%;
        }
        &__gen-control-prev {
            left: 3%;
        }
    }
}
</style>