<script setup lang="ts">
    import { defineProps, defineEmits } from 'vue';

    const { selectedFruit, fruitName, fruitColor, fruitTaste } = defineProps(['selectedFruit', 'fruitName', 'fruitColor', 'fruitTaste']);

    const emits = defineEmits(['update:selectedFruit', 'update:fruitName', 'update:fruitColor', 'update:fruitTaste']);

    const updateSelectedFruit = (event: Event) => {
        if (event.target instanceof HTMLSelectElement) {
            emits('update:selectedFruit', event.target.value);
        }
    };

    const updateFruitName = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            emits('update:fruitName', event.target.value);
        }
    };

    const updateFruitColor = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            emits('update:fruitColor', event.target.value);
        }
    };

    const updateFruitTaste = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            emits('update:fruitTaste', event.target.value);
        }
    };
</script>

<template>
    <form class="fruit-form">
        <div class="input-wrapper">
            <label class="form-label">Choose image:</label>
            <select name="fruits" id="fruits" class="form-input" :value="selectedFruit" @change="updateSelectedFruit">
                <option value="Choose a fruit" disabled selected>Choose a fruit</option>
                <option value="Fruit basket">Fruit basket</option>
                <option value="Apple">Apple</option>
                <option value="Banana">Banana</option>
                <option value="Orange">Orange</option>
                <option value="Grapes">Grapes</option>
                <option value="Mango">Mango</option>
                <option value="Pear">Pear</option>
                <option value="Pineapple">Pineapple</option>
                <option value="Watermelon">Watermelon</option>
                <option value="Kiwi">Kiwi</option>
                <option value="Pomegranate">Pomegranate</option>
            </select>
        </div>
        <div class="input-wrapper">
            <label class="form-label">Name of the fruit:</label>
            <input
                type="text"
                class="form-input"
                :value="fruitName"
                @input="updateFruitName"
            >
        </div>
        <div class="input-wrapper">
            <label class="form-label">Color of the fruit:</label>
            <input
                type="text"
                class="form-input"
                :value="fruitColor"
                @input="updateFruitColor"
            >
        </div>
        <div class="input-wrapper">
            <label class="form-label">Taste of the fruit:</label>
            <input
                type="text"
                class="form-input"
                :value="fruitTaste"
                @input="updateFruitTaste"
            >
        </div>
    </form>
</template>

<style scoped>
    .fruit-form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    .input-wrapper {
        display: flex;
        flex-direction: column;
        width: fit-content;
    }

    .form-label {
        font-style: italic;
        display: flex;
        align-self: flex-start;
        width: 100%;
        
    }

    .form-input {
        width: 20vw;
        padding: 0.5rem;
        border-radius: 15px;
        border: none;
    }
</style>