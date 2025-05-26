<script setup>
import {ModalsContainer} from 'vue-final-modal';
</script>

<template>
    <main id="pokedex-app">
        <slot />
        <ModalsContainer />
    </main>
</template>

<style>
.confirm-modal {
	display: flex;
	justify-content: center;
	align-items: center;
}
.confirm-modal-content {
	display: flex;
	flex-direction: column;
	padding: 1rem;
}
</style>