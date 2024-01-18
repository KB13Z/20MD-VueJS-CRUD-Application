<script setup lang="ts">
    import { ref, onMounted, computed, watch, watchEffect } from 'vue';
    import axios from 'axios';
    import { useRoute, useRouter } from 'vue-router';
    import FruitForm from '@/components/FruitForm/FruitForm.vue';
    import DeleteConfirmationModal from '@/components/DeleteConfirmationModal/DeleteConfirmationModal.vue';

    const localStorageKey = 'fruitData';

    const getLocalStorageData = () => {
        const storedData = localStorage.getItem(localStorageKey);
        return storedData ? JSON.parse(storedData) : null;
    };

    const saveToLocalStorage = (data: FormData) => {
        localStorage.setItem(localStorageKey, JSON.stringify(data));
    };

    interface Fruit {
        id: number;
        image: string;
        name: string;
        color: string;
        taste: string;
    }

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

    const router = useRouter();

    const goBack = () => {
        router.push('/');
    }

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

    const fruit = ref<Fruit | null>(null);
    const route = useRoute();
    const isEditing = ref(false);

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

    const fetchFruit = async () => {
        const fruitId = route.params.id;
        
        try {
            const response = await axios.get(`http://localhost:3001/fruits/${fruitId}`);
            fruit.value = response.data;
        } catch (error) {
            console.error('Error fetching fruit data:', error);
        }
    };

    const startEditing = () => {
        isEditing.value = true;
    };

    const cancelStatus = ref<string | null>(null);

    const cancelEditing = () => {
        isEditing.value = false;
        cancelStatus.value = 'Changes are not made!'
    };

    const isFormValid = computed(() => {
        return (
            formData.value.selectedFruit !== 'Choose a fruit' &&
            formData.value.fruitName.trim() !== '' &&
            formData.value.fruitColor.trim() !== '' &&
            formData.value.fruitTaste.trim() !== ''
        );
    });

    const savingStatus = ref<string | null>(null);
    const validationStatus = ref<string | null>(null);

    const saveChanges = async () => {
        try {
            if (!isFormValid.value) {
                validationStatus.value = 'Please fill in all fields!';
                return;
            }

            const newFruit = {
                image: getFruitImage.value,
                name: formData.value.fruitName,
                color: formData.value.fruitColor,
                taste: formData.value.fruitTaste,
            };

            await axios.put(`http://localhost:3001/fruits/${fruit.value?.id}`, newFruit);
            
            if (fruit.value) {
                fruit.value.image = newFruit.image;
                fruit.value.name = newFruit.name;
                fruit.value.color = newFruit.color;
                fruit.value.taste = newFruit.taste;
            }
            
            isEditing.value = false;

            savingStatus.value = 'Changes saved successfully!'
            
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    };

    const deleteStatus = ref<string | null>(null);
    const deleted = ref(false);
    const showConfirmationDialog = ref(false);

    const cancelDelete = () => {
        showConfirmationDialog.value = false;
        cancelStatus.value = 'Post is not deleted!';
    };

    const deletePost = async () => {
        if (showConfirmationDialog.value) {
            try {
                await axios.delete(`http://localhost:3001/fruits/${fruit.value?.id}`);
                deleteStatus.value = 'Post deleted successfully!';
                deleted.value = true;
                showConfirmationDialog.value = false;
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        } else {
            showConfirmationDialog.value = true;
        }
    };

    const setInitialFormValues = () => {
        if (fruit.value) {
            formData.value.fruitName = fruit.value.name;
            formData.value.fruitColor = fruit.value.color;
            formData.value.fruitTaste = fruit.value.taste;
        }
    }

    onMounted(() => {
        fetchFruit();
    });

    watch(
        () => isEditing.value,
        (newVal) => {
            if (newVal) {
                setInitialFormValues();
            }
        }
    );
</script>

<template>
    <button type="button" class="back-button" @click="goBack">← Go back</button>
    <div class="post-container">
        <div class="delete-status" v-if="deleteStatus">
            {{ deleteStatus }}
        </div>
        <div v-if="!isEditing && fruit && !deleted" class="post-wrapper">
            <img :src="fruit.image" alt="Fruit image" class="post-image" />
            <h3 class="fruit-name">{{ fruit.name }}</h3>
            <p><em>Color:</em> {{ fruit.color }}</p>
            <p><em>Taste:</em> {{ fruit.taste }}</p>
            <div class="buttons-wrapper" v-if="!showConfirmationDialog">
                <button type="button" class="post-button" @click="startEditing">Edit</button>
                <button type="button" class="post-button" @click="deletePost">Delete</button>
            </div>
            <div class="confirmation-wrapper" v-if="showConfirmationDialog">
                <DeleteConfirmationModal @confirmed="deletePost" @canceled="cancelDelete" />
            </div>
            <div class="saving-status" v-if="savingStatus">
                {{ savingStatus }}
            </div>
            <div class="cancel-status" v-if="cancelStatus">
                {{ cancelStatus }}
            </div>
        </div>
        <form v-if="isEditing && fruit" class="edit-form">
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
            <div class="formButtons-wrapper">
                <button type="button" class="form-button" @click="saveChanges">Save</button>
                <button type="button" class="form-button" @click="cancelEditing">Cancel</button>
            </div>
            <div class="validation-status" v-if="validationStatus">
                {{ validationStatus }}
            </div>
        </form>
    </div>
</template>

<style scoped>
    .back-button {
        padding: 0.5rem;
        border: 1px solid purple;
        border-radius: 15px;
        background-color: white;        
        color: purple;
        font-weight: bold;
        font-style: italic;
        margin-top: 2rem;
        margin-left: 2rem;
    }

    .back-button:hover {
        cursor: pointer;
        transform: scale(1.1);
        transition: 0.4s;
    }
    .post-container {
        width: 100%;
        padding: 2rem;
        display: flex;
        justify-content: center;
        margin-bottom: 5rem;
        margin-top: 5rem;
    }

    .delete-status {
        font-weight: bold;
        font-size: 20px;
    }

    .post-wrapper {
        padding: 2rem;
        border: 2px solid purple;
        border-radius: 20px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    .post-image {
        width: 300px;
        border-radius: 15px;
    }

    .fruit-name {
        font-weight: bold;
        margin-bottom: 1rem;
    }

    .buttons-wrapper {
        text-align: end;
        margin-top: 2rem;
    }

    .post-button {
        padding: 0.5rem;
        border: 1px solid purple;
        border-radius: 15px;
        background-color: white;        
        color: purple;
        font-weight: bold;
        font-style: italic;
        margin-right: 1rem;
    }

    .post-button:hover {
        cursor: pointer;
        transform: scale(1.1);
        transition: 0.4s;
    }

    .confirmation-wrapper {
        margin-top: 1rem;
    }

    

    .saving-status {
        margin-top: 1rem;
        text-align: end;
        font-style: italic;
    }

    .cancel-status {
        margin-top: 1rem;
        text-align: end;
        font-style: italic;
    }

    .edit-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        border: 2px solid purple;
        border-radius: 20px;
        padding: 2rem;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
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
        width: 300px;
        padding: 0.5rem;
        border-radius: 15px;
        border: none;
    }

    .formButtons-wrapper {
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

    .validation-status {
        margin-top: 1rem;
        text-align: end;
        font-style: italic;
    }
</style>