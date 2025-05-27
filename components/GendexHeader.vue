<script setup>
    import { formatGenerationName } from '~/utils/pokemon';

    const props = defineProps({
    generationName: {
        type: String,
        default: '',
    },
    genPokemonListLength: {
        type: Number,
        default: 0,
    }
    });
</script>

<template>
    <div 
        class="c-gendex-header" 
        :class="{ 'gen-page': genPokemonListLength && genPokemonListLength > 0}">
        <NuxtLink :to="'/'" class="c-gendex-header__gendex">
            <div class="c-gendex-header__gendex-img">
                <img src="/logo-gendex.png" alt="Gendex logo" loading="lazy" />
            </div>
            <div class="c-gendex-header__gendex-text">
                <h1>Gen<span style="color: #00ba6e;">Dex</span></h1>
                <p>Nuxt3 Pokedex</p>
            </div>
        </NuxtLink>
        <div 
            v-if="(genPokemonListLength && genPokemonListLength > 0) && (generationName && generationName)" 
            class="c-gendex-header___info">
            <p class="c-gendex-header__title">{{ formatGenerationName(generationName) }}</p>
            <p class="c-gendex-header__subtitle">{{ genPokemonListLength + ' Pokémons in this generation' }}</p>
        </div>
    </div>
</template>

<style lang="scss">
.c-gendex-header {
    width: 100%;
    border-bottom: 3px solid #159b63;
    box-shadow: 0 2px 8px;
    background-color: #FFF;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 7%;
    justify-content: center;
    &.gen-page {
        justify-content: space-between;
    }
    &__gendex {
        display: flex;
        align-items: center;
        text-decoration: none;
    }
    &__gendex-text {
        h1 {
            font-size: 32px;
            margin-bottom: 1%;
            text-transform: capitalize;
            margin-top: 0;
        }
        p {
            margin: 0;
            font-size: 14px;
        }
    }
    &__gendex-img {
        max-width: 75px;
        img {
            width: 100%;
            height: auto;
        } 
    }
    &__title {
        font-size: 32px;
        font-weight: bold;
        margin: 0 0 1% 0
    }
    &__subtitle {
        margin: 0
    }
}

@media (max-width: 768px) {
    .c-gendex-header {
        padding: 15px 4%;
        &__gendex-text {
            h1 {
                font-size: 22px;
            }
            p {
                font-size: 12px;
            }
        }
        &__title {
            font-size: 18px;
            font-weight: bold;
            margin: 0;
        }
        &__subtitle {
            font-size: 12px;
            margin: 0
        }
        &__gendex-img {
            max-width: 60px;
        }
    }
}
</style>