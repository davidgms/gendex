/**
 * handles images error by showing a console message and emiting OnImgError
 * @param {string} type - type of the image (default, shiny, icon)
 * @param {object} pokemon - active pokemon from which the image come from
 * @param {function} emit - image fallback function on [id].vue 
 * @returns - console message with the error and OnImgError function
 */

export function handleImgError(type, pokemon, emit) {
  if (!pokemon || typeof pokemon !== 'object') {
    console.error(`Image (${type}) not found: Pokémon data is undefined or invalid.`, pokemon);
    if (emit) emit('onImgError', type, pokemon);
    return;
  }
  console.error(
    `Image (${type}) not found for Pokémon #${pokemon.id} (${pokemon.name}): ${pokemon.icon}`
  );
  if (emit) emit('onImgError', type, pokemon);
}