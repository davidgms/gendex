export default defineEventHandler((event) => {
  if (event.node.req.url?.startsWith('/pokemon-games/') || event.node.req.url?.endsWith('.png')) {
    event.node.res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  }
});