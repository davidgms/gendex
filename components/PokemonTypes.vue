<script setup>
    const tooltipVisible = ref(null);

    const props = defineProps({
        activePokemon: { 
            type: Object,
            required: true
        },
    })

    function toggleTooltip(typeName) {
        tooltipVisible.value = tooltipVisible.value === typeName ? null : typeName;
    }
</script>

<template>
    <div 
        v-if="activePokemon.types"
        class="c-pokemon-types">
        <div 
            v-for="type in activePokemon.types"
            :key="type.type.name"
            class="c-pokemon-types__container"
            :class="type.type.name + '-image'"
            @click="toggleTooltip(type.type.name)"
            @touchstart.prevent="toggleTooltip(type.type.name)">
            <img 
                :src="`/pokemon-types/${type.type.name}.svg`"
                :alt="type.type.name + ' type image'"
                role="img"
                class="c-pokemon-types__image"/>
            <span 
                class="c-pokemon-types__tooltip"
                :class="{ 'show-tooltip': tooltipVisible === type.type.name }">
                {{ type.type.name }}
            </span>
        </div>
    </div>
</template>


<style scoped lang="scss">
    .c-pokemon-types {
        display: flex;
        width: max-content;
        &__container {
            border-radius: 100%;
            height: 35px;
            width: 35px;
            margin: auto 10px;
            position: relative;
            &:hover span {
                visibility: visible;
                opacity: 1;
            }
            img {
                height: 60%;
                width: 60%;
                margin: 20%;
            }
        }
        &__tooltip {
            visibility: hidden;
            opacity: 0;
            background: #222;
            color: #fff;
            text-transform: capitalize;
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 14px;
            position: absolute;
            top: 115%;
            left: 50%;
            transform: translateX(-50%);
            white-space: nowrap;
            pointer-events: none;
            transition: opacity 0.2s;
            z-index: 10;
            &.show-tooltip {
                visibility: visible;
                opacity: 1;
            }
        }
    }
    .bug-image {
        background: #92BC2C;
    }

    .dark-image {
        background: #595761;
    }

    .dragon-image {
        background: #0C69C8;
    }

    .electric-image {
        background: #F2D94E;
    }

    .fire-image {
        background: #FBA54C;
    }

    .fairy-image {
        background: #EE90E6;
    }

    .fighting-image {
        background: #D3425F;
    }

    .flying-image {
        background: #A1BBEC;
    }

    .ghost-image {
        background: #5F6DBC;
    }

    .grass-image {
        background: #5FBD58;
    }

    .ground-image {
        background: #DA7C4D;
    }

    .ice-image {
        background: #75D0C1;
    }

    .normal-image {
        background: #A0A29F;
    }

    .poison-image {
        background: #B763CF;
    }

    .psychic-image {
        background: #FA8581;
    }

    .rock-image {
        background: #C9BB8A;
    }

    .steel-image {
        background: #5695A3;
    }

    .water-image {
        background: #539DDF;
    }
</style>

