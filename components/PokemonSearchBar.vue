<script setup>
    const props = defineProps({
    searchQuery: {
        type: String,
        default: '',
    }
    });

    /**
     * Events emited:
     * @event update:searchQuery - when the user types, emit the new field value
     *   @param {string} value - The value typed in the input
     */
    const emit = defineEmits(['update:searchQuery']);
</script>

<template>
  <form action="" class="c-search-bar" >
    <input
      id="searchPokemon"
      type="search"
      placeholder="Search name or number"
      :value="searchQuery"
      @input="emit('update:searchQuery', $event.target.value)"
    >
    <Icon name="simple-line-icons:magnifier" class="c-search-bar__icon" />
  </form>
</template>

<style lang="scss">
.c-search-bar {
    position: relative;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    input {
        padding: 10px 10px 10px 30px;
		width: 90%;
        border: 1px solid #ccc;
        max-height: 32px;
        border-radius: 5px;
        font-size: 16px;
        outline: none;
    }
    &__icon {
        position: absolute;
        left: 0;
        margin-left: 10px;
    }
}

@media (max-width: 768px) {
  .c-search-bar {
    input {
        width: 100%;
	}
  }
}
</style>