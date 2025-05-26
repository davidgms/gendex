<script setup>
    import GendexHeader from '../components/GendexHeader.vue';
</script>
<template>
    <div>
        <GendexHeader/>
        <div class="c-page-error">
            <Icon name="material-symbols:warning-outline" size="6em" aria-hidden="true"/>
            <h2>Something went wrong!</h2>
            <p>It looks like you're experiencing some issues. Let's start over:</p>
            <NuxtLink to="/" :aria-label="`Go to home page`">Back to home</NuxtLink>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .c-page-error {
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
        .c-page-error {
            min-height: calc(100dvh - 94px);  
        } 
    }
</style>