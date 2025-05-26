<script setup>
    import { useNuxtApp } from '#app';
    import { handleImgError } from '~/utils/imageErrorHandler';

    const { $viewport } = useNuxtApp();
    const props = defineProps({
        pokemon: {
            type: Object,
            required: true
        },
        activePokemon: {
            type: Object,
            required: true
        }
    })

    /**
     * Events emited:
     * @event changeActivePokemon - when the user clicks a list item, emit the selected pokémon id.
     *   @param {number} id - the id of the selected pokémon.
     * @event onImgError - emits when a loading image return error.
     *   @param {string} type - the type of the image ('icon', 'default', 'shiny').
     *   @param {objeto} pokemon - the pokémon object the error refers to.
     */

    const emit = defineEmits(['changeActivePokemon', 'onImgError']);

</script>

<template>
    <li 
        class="c-pokemon-list__item"
        :class="{ active: $viewport.isGreaterOrEquals('tablet') && (activePokemon && activePokemon.id === pokemon.id) }"
        @click="emit('changeActivePokemon', pokemon.id)">
        <template v-if="!pokemon.iconErrored">
            <NuxtImg 
                :src="pokemon.icon"
                :alt="pokemon.name + ' icon'"
                placeholder
                loading="lazy"
                role="img"
                @error="() => handleImgError('icon', pokemon && pokemon.id ? pokemon : null, emit)"
            />
        </template>
        <template v-else>
            <img
                class="imgDefault"
                :src="pokemon.defaultImg"
                :alt="pokemon.name + ' icon'"
                loading="lazy"
                style="height: 50px;"
            >
        </template>
        <span>No.{{ pokemon.id + ' ' + pokemon.name }}</span>
    </li>
</template>

<style scoped lang="scss">
.c-pokemon-list__item {
    padding: 5px 0 13px 0;
    border-bottom: 1px solid rgb(219, 219, 219);
    font-size: clamp(18px, 6vw, 22px);
    text-transform: capitalize;
    display: flex;
    align-items: end;
    cursor: pointer;
    &:hover, &.active {
        background-color: rgba(213, 255, 203, 0.856);
    }
    img {
        width: auto;
        height: 60px;
    }
    span {
        border-left: 1px solid grey;
        padding-left: 2%;
    }
    &:first-child {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
}
</style>