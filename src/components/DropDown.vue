<template>
    <div class="btn-group">
        <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            Select cat Breed
        </button>
        <ul class="dropdown-menu">
            <li v-for="breed in $store.getters.getBreeds" :key="breed.id">
                <a class="dropdown-item" href="#" v-on:click="fetchImages(breed.id)">{{ breed.name }}</a> 
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    import { useStore } from 'vuex';
    import { computed } from 'vue';
    
    const store = useStore();
    store.dispatch('fetchBreeds');
    
    function fetchImages(breedId: string) {
        store.commit('updateBreedId', breedId);
        store.commit('updatePage', 0);
        store.dispatch('fetchImages', { breedId, method: 'new' });
    }
</script>

