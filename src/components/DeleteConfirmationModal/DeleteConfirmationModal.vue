<script setup lang="ts">
    import { ref, defineEmits } from 'vue';

    const showConfirmationDialog = ref(true);
    const emits = defineEmits(['confirmed', 'canceled']);

    const confirmDelete = () => {
        showConfirmationDialog.value = false;
        emits('confirmed');
    };

    const cancelDelete = () => {
        showConfirmationDialog.value = false;
        emits('canceled');
    };
</script>

<template>
    <div class="confirmation-modal">
        <p class="confirmation-dialog">Are you sure you want to delete this post?</p>
        <div class="buttons-wrapper">
            <button type="button" class="confirmation-button" @click="confirmDelete">Delete</button>
            <button type="button" class="confirmation-button" @click="cancelDelete">Cancel</button>
        </div>
    </div>
</template>

<style scoped>
    .confirmation-modal {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .confirmation-dialog {
        font-style: italic;
        text-align: center;
    }

    .buttons-wrapper {
        display: flex;
        gap: 1rem;
    }

    .confirmation-button {
        padding: 0.5rem;
        border: 1px solid purple;
        border-radius: 15px;
        background-color: white;        
        color: purple;
        font-weight: bold;
        font-style: italic;
    }

    .confirmation-button:hover {
        cursor: pointer;
        transform: scale(1.1);
        transition: 0.4s;
    }
</style>