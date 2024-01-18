<script setup lang="ts">
    import FruitForm from '../components/FruitForm/FruitForm.vue'
    import axios from 'axios';
    import { ref, computed, watchEffect } from 'vue';

    const title='Create a post';

    const localStorageKey = 'newFruitData';

    const getLocalStorageData = () => {
        const storedData = localStorage.getItem(localStorageKey);
        return storedData ? JSON.parse(storedData) : null;
    };

    const saveToLocalStorage = (data: FormData) => {
        localStorage.setItem(localStorageKey, JSON.stringify(data));
    };

    interface FormData {
        selectedFruit: string;
        fruitName: string;
        fruitColor: string;
        fruitTaste: string;
    }

    const formData = ref<FormData>(getLocalStorageData() || {
        selectedFruit: 'Choose a fruit',
        fruitName: '',
        fruitColor: '',
        fruitTaste: '',
    })

    watchEffect(() => {
        saveToLocalStorage(formData.value);
    });

    const updateSelectedFruit = (value: string) => {
        formData.value.selectedFruit = value;
    };

    const updateFruitName = (value: string) => {
        formData.value.fruitName = value;
    };

    const updateFruitColor = (value: string) => {
        formData.value.fruitColor = value;
    };

    const updateFruitTaste = (value: string) => {
        formData.value.fruitTaste = value;
    };

    const isPreviewing = ref(false);

    const getFruitImage = computed(() => {
        switch (formData.value.selectedFruit) {
            case 'Fruit basket':
                return '/form-images/fruit-basket.jpeg';
            case 'Apple':
                return '/form-images/apple.jpg';
            case 'Banana':
                return '/form-images/banana.jpg';
            case 'Orange':
                return '/form-images/orange.jpg';
            case 'Grapes':
                return '/form-images/grape.jpg';
            case 'Mango':
                return '/form-images/mango.jpg';
            case 'Pear':
                return '/form-images/pear.jpg';
            case 'Pineapple':
                return '/form-images/pineapple.jpg';
            case 'Watermelon':
                return '/form-images/watermelon.jpg';
            case 'Kiwi':
                return '/form-images/kiwi.jpg';
            case 'Pomegranate':
                return '/form-images/pomegranate.jpg';
            default:
                return '';
        }
    });

    const preview = () => {
        isPreviewing.value = true;
    }

    const resetPreview = () => {
        isPreviewing.value = false;
    }

    const isFormValid = computed(() => {
        return (
            formData.value.selectedFruit !== 'Choose a fruit' &&
            formData.value.fruitName.trim() !== '' &&
            formData.value.fruitColor.trim() !== '' &&
            formData.value.fruitTaste.trim() !== ''
        );
    });

    const submissionStatus = ref<string | null>(null);

    const submit = async () => {
        try {
            if (!isFormValid.value) {
                submissionStatus.value = 'Please fill in all fields!';
                return;
            }

            const newFruit = {
                image: getFruitImage.value,
                name: formData.value.fruitName,
                color: formData.value.fruitColor,
                taste: formData.value.fruitTaste,
            };

            await axios.post('http://localhost:3001/fruits', newFruit);

            submissionStatus.value = 'Post submitted successfully!';

            formData.value.selectedFruit = 'Choose a fruit';
            formData.value.fruitName = '';
            formData.value.fruitColor = '';
            formData.value.fruitTaste = '';

            resetPreview();

        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };
</script>

<template>
    <div class="form-container">
        <h2 class="form-title">{{ title }}</h2>
        <div class="form-wrapper">
            <FruitForm 
                :selectedFruit="formData.selectedFruit"
                :fruitName="formData.fruitName"
                :fruitColor="formData.fruitColor"
                :fruitTaste="formData.fruitTaste"
                @update:selectedFruit="updateSelectedFruit"
                @update:fruitName="updateFruitName"
                @update:fruitColor="updateFruitColor"
                @update:fruitTaste="updateFruitTaste"
            />
            <div class="buttons-wrapper">
                <button type="button" class="form-button" @click="preview">Preview</button>
                <button type="button" class="form-button" @click="submit">Submit</button>
            </div>
            <div class="submission-status" v-if="submissionStatus">
                {{ submissionStatus }}
            </div>
        </div>
        <div v-if="isPreviewing" class="preview-wrapper">
            <h3 class="preview-title">Preview</h3>
            <div v-if="formData.selectedFruit !== 'Choose a fruit'">
                <img :src="getFruitImage" alt="Selected fruit" class="fruit-image">
            </div>
            <div class="preview-text">
                <h3 class="preview-name">{{ formData.fruitName }}</h3>
                <p><em>Color:</em> {{ formData.fruitColor }}</p>
                <p><em>Taste:</em> {{ formData.fruitTaste }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .form-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        justify-content: center;
        padding: 2rem;
        margin-bottom: 6rem;
        margin-top: 8rem;
    }

    .form-title {
        font-weight: bold;
        font-style: italic;
    }

    .form-wrapper {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        border: 2px solid purple;
        border-radius: 20px;
        padding: 2rem;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    .buttons-wrapper {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 1rem;
    }

    .form-button {
        padding: 0.5rem;
        border: 1px solid purple;
        border-radius: 15px;
        background-color: white;        
        color: purple;
        font-weight: bold;
        font-style: italic;
    }

    .form-button:hover {
        cursor: pointer;
        transform: scale(1.1);
        transition: 0.4s;
    }

    .submission-status {
        font-style: italic;
    }

    .preview-wrapper {
        padding: 2rem;
        border: 2px solid purple;
        border-radius: 20px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    .preview-title {
        font-style: italic;
        text-align: center;
        margin-bottom: 0.5rem;
    }

    .fruit-image {
        width: 250px;
        border-radius: 15px;
    }

    .preview-text {
        width: 100%;
    }

    .preview-name {
        font-weight: bold;
        margin-bottom: 1rem;
    }
</style>