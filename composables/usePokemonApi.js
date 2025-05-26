export function usePokemonApi() {
	const flavorTextCache = new Map()
	const pokemonTypesCache = new Map()

    /**
     * Fetch the active pokemon english flavor text and formats 'POKÉMON' to 'Pokémon'
     * @param {number} id - active pokémon id
     * @returns {string} - active pokémon formated flavor text
     */
	const fetchFlavorText = async (id) => {
		if (flavorTextCache.has(id)) return flavorTextCache.get(id)
		try {
			const speciesData = await $fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
			const entry = speciesData.flavor_text_entries.find(e => e.language.name === 'en')
			const flavorText = entry ? entry.flavor_text.replace(/\n|\f/g, ' ').replace('POKéMON', 'Pokémon') : 'No description available.'
			flavorTextCache.set(id, flavorText)
			return flavorText
		} catch {
			return 'No description available.'
		}
  	}

	/**
	 * Fetch the active pokemon types
	 * @param {number} id - active pokémon id
	 * @returns {string} - active pokémon types
	 */
	const fetchPokemonTypes = async (id) => {
		if (pokemonTypesCache.has(id)) return pokemonTypesCache.get(id)
		try {
			const pokemonData = await $fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
			const types = pokemonData.types
			pokemonTypesCache.set(id, types)
			return types
		} catch {
			return []
		}
	}

	/**
	 * Fetch the pokémon generation by id (id = generation version/number)
	 * @param {number} id - pokémon generation id
	 * @returns {object} - pokémon generation data types
	 */
	const fetchGeneration = async (generationId) => {
		return await $fetch(`https://pokeapi.co/api/v2/generation/${generationId}`)
	}

  	return { fetchFlavorText, fetchPokemonTypes, fetchGeneration }
}