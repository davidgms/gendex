<script setup>
    import PokemonSearchBar  from "./PokemonSearchBar.vue";
    import PokemonListItem  from "./PokemonListItem.vue";
    import LoadingOverlay from 'vue-loading-overlay'

    const isLoading = ref(true);

    const props = defineProps({
        filteredPokemonList: {
            type: Object,
            required: true
        },
        activePokemon: {
            type: Object,
            required: true
        },
        searchQuery: {
            type: String,
            default: '',
        },
    })

    /**
     * Events emited:
     * @event changeActivePokemon - when the user clicks a list item, emit the selected pokémon id.
     *   @param {number} id - the id of the selected pokémon.
     * @event onImgError - emits when a loading image return error.
     *   @param {string} type - the type of the image ('icon', 'default', 'shiny').
     *   @param {objeto} pokemon - the pokémon object the error refers to.
     * @event update:searchQuery - when the user types, emit the new field value
     *   @param {string} value - The value typed in the input
     */

    const emit = defineEmits(['changeActivePokemon', 'onImgError', 'update:searchQuery']);

    onMounted(async () => {
        isLoading.value = false
    })
</script>

<template>
    <div class="c-pokemon-list">
        <LoadingOverlay :active="isLoading" :is-full-page="false" loader="dots" color="#019e5e" background-color="#F0F8FF" :opacity="1" :z-index="900"/>
        <PokemonSearchBar 
            :searchQuery="searchQuery"
            @update:searchQuery="val => emit('update:searchQuery', val)"
        />
        
        <ul v-if="filteredPokemonList.length">
            <PokemonListItem 
                v-for="pokemon in filteredPokemonList" :key="pokemon.id+'-listing'"
                :pokemon="pokemon"
                :activePokemon="activePokemon"
                @changeActivePokemon="pokemonId => emit('changeActivePokemon', pokemonId)"
                @onImgError="(icon, pokemon) => emit('onImgError', icon, pokemon)"
            />
        </ul>
        <p class="no-results" v-else>No Pokémon found :c</p>
    </div>
</template>

<style scoped lang="scss">
.c-pokemon-list {
    background-color: #F0F8FF;
    box-shadow: 0 2px 8px;
    border-radius: 15px;
    height: 70dvh;
    position: relative;
    width: 50%;
        padding: 3% 0 3% 3%;
    ul {
        text-decoration: none;
        list-style: none;
        max-height: 90%;
        overflow: auto;
        margin-block-start: 0;
        margin-block-end: 0;
        padding-inline-start: 0;
        padding-right: 8%;
    }
    p.no-results {
        font-size: clamp(18px, 18px, 22px);
    }
}

@media (max-width: 768px) {
    .c-pokemon-list {
        width: 100%;
        padding: 3%;
        ul {
            padding-right: 0;
        }
    }
}
</style>