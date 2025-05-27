<script setup>
    const GendexHeader = defineAsyncComponent(() => import('~/components/GendexHeader.vue'));
</script>
<template>
    <div>
        <GendexHeader/>
        <div class="c-page-not-found">
            <Icon name="material-symbols:warning-outline" size="6em" aria-hidden="true" />
            <h2>404 Page not Found</h2>
            <p>The page you are trying to access was not found. Let's start over:</p>
            <NuxtLink to="/" :aria-label="`Go to home page`">Back to home</NuxtLink>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .c-page-not-found {
        min-height: calc(100dvh - 108px);    
        background: linear-gradient(180deg,rgba(255, 255, 255, 0.5) 0%, rgba(0, 220, 128, 0.397) 100%);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0;
        h2 {
            font-size: clamp(32px, 4vw, 50px);
            color: #000;
            margin-bottom: 2%;
            width: max-content;
        }
        p {
            font-size: clamp(18px, 20px, 20px);
        }
        a {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 48px;
            max-height: 48px;
            background-color: #b7ecff;
            border: 1px solid #4bbaff ;
            color: #000;
            border-radius: 15px;
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
            font-size: 16px;
            width: max-content;
            text-decoration: none;
            padding: 1rem 2rem;
            margin-top: 2%;
        }
    }
    @media (max-width: 768px){
        .c-page-not-found {
            min-height: calc(100dvh - 94px);  
        } 
    }
</style>