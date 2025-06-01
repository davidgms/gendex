<script setup>
defineProps({
  count: { type: Number, required: true },
  currentId: { type: Number, required: true }
});
</script>

<template>
  <div class="c-generation-pagination">
	<div class="c-generation-pagination__container">
		<template v-if="count">
			<NuxtLink
			  v-for="(gen, index) in count"
			  :key="gen"
			  :to="`/generation/${gen}`"
			  class="c-generation-pagination__btn"
			  :class="{ active: gen === currentId }"
			  :aria-current="gen === currentId ? 'page' : null"
			  tabindex="0"
			  :aria-label="`Go to generation ${index + 1}`"
			>
			  Gen {{ gen }}
			</NuxtLink>
		</template>
	</div>
  </div>
</template>

<style scoped lang="scss">
.c-generation-pagination {
	margin-top: 24px;;
	&__container {
		gap: 10px;
		display: flex;
		overflow: auto;
		justify-content: center;
		align-items: center;
	}
    .c-generation-pagination__btn {
        padding: 6px 12px;
        border-bottom: 1px solid #3030303d;
        border-radius: 0;
        background: transparent;
        color: #000;
        font-weight: normal;
        cursor: pointer;
        opacity: 0.7;
		text-align: center;
        text-decoration: none;
        &.active, &:disabled {
            color: #000;
            border-bottom: 4px solid #019e5e;
            cursor: default;
            opacity: 1;
            font-weight: bold;
        }
        &:hover:not(:disabled, .active) {
            opacity: 1;
            background: #b7ecff93;
            border-radius: 10px;
        }
    }
}

@media (max-width: 768px) {
	.c-generation-pagination {
		max-width: 80%;
		&__container {
			margin-left: 20%;
			justify-content: start;
		}
		.c-generation-pagination__btn {
			min-width: 81px;
		}
	}
}
</style>
