<script setup lang="ts">
    const title='About Frutsy World'
    const subtitle='Welcome to Fruitsy World, your go-to destination for everything fruity! 🍎🍌🍇'
    const description="At Fruitsy World, we believe in the power of fruits to nourish, delight, and inspire. Whether you're a fruit enthusiast, a nutrition buff, or just someone with a sweet tooth, Fruitsy World is the place to be. Our platform is dedicated to bringing you a vibrant collection of posts, articles, and discussions all centered around the wonderful world of fruits."
</script>

<template>
    <div class="about-wrapper">
        <h2 class="about-title">{{ title }}</h2>
        <h3 class="about-subtitle">{{ subtitle }}</h3>
        <div class="description-wrapper">
            <p class="about-description">{{ description }}</p>
        </div>
        <div class="image-wrapper">
            <img src="/images/apples.jpg" alt="Apples" class="about-image">
            <img src="/images/bananas.jpg" alt="Bananas" class="about-image">
            <img src="/images/grapes.jpg" alt="Grapes" class="about-image">
        </div>
    </div>   
</template>

<style scoped>
    .about-wrapper {
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 2rem;
        gap: 2rem;
        margin-bottom: 2rem;
    }

    .about-title {
        font-weight: bold;
        font-style: italic;
    }

    .about-subtitle {
        font-style: italic;
    }

    .description-wrapper {
        width: 50vw;
    }

    .about-description {
        text-align: center;
    }

    .image-wrapper {
        display: flex;
        gap: 2rem;
        padding-top: 2rem;
    }

    .about-image {
        width: 20vw;
        border-radius: 20px;
        border: 1px solid purple;
    }
</style>