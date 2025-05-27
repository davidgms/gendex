<script setup>
  useHead({
    title: 'GenDex - Nuxt3 Generations Pokedex',
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  })
</script>

<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>

<style>
* {
  box-sizing: border-box;
  font-family: "Outfit", sans-serif;
  font-optical-sizing: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
html:has(.c-generation-page),
#__nuxt:has(.c-generation-page),
#pokedex-app:has(.c-generation-page) {
    height: 100%;
}
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
.vl-overlay {
  border-radius: 15px !important;
}

</style>