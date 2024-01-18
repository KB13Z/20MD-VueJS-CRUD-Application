<script setup lang="ts">
    import { RouterLink, RouterView } from 'vue-router';
    const title = '🍏 Fruitsy World 🍏';
</script>

<template>
    <header class="app-header">
        <h1 class="header-title">{{ title }}</h1>
        <nav class="header-navigation">
            <router-link to="/" class="header-link">Home</router-link>
            <p>|</p>
            <router-link to="/create-a-post" class="header-link">Create a post</router-link>
            <p>|</p>
            <router-link to="/about" class="header-link">About</router-link>
        </nav>
    </header>
    <router-view></router-view>
</template>

<style scoped>
    .app-header {
        background-color: purple;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        padding: 1rem;
        color: lightgreen;
        top: 0;
        left: 0;
        right: 0;
        position: fixed;
    }

    .header-title {
        font-weight: bold;
        font-style: italic;
    }

    .header-navigation {
        display: flex;
        gap: 2rem;
    }

    .header-link {
        text-decoration: none;
        color: lightgreen;
    }

    .header-link:hover {
        transform: scale(1.1);
        transition: 0.3s;
    }
</style>