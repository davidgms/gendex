export default defineEventHandler((event) => {
    const apiUrl = `https://pokeapi.co${event.node.req.url}`;
    return $fetch(apiUrl);
});
