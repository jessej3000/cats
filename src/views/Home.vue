<template>
  <div>
    <!-- Header -->
    <header data-bs-theme="dark">
        <div class="text-bg-dark collapse" id="navbarHeader" style="">
            <div class="container">
            <div class="row">
                <div class="col-sm-8 col-md-7 py-4">
                <h4>About this demo</h4>
                <p class="text-body-secondary">
                    Welcome to our purrrrrfect world of feline fascination! My demo cats website is a celebration of the charm, elegance, and diversity of our cute friends. Powered by Vue 3, and sleepless nights, this website brings a seamless and interactive experience to feline enthusiasts.
                </p>
                <p>- Jesse Junsay</p>
                </div>
                <div class="col-sm-4 offset-md-1 py-4">
                <h4>Contact</h4>
                <ul class="list-unstyled">
                    <li><a :href="email" class="text-white">Email me</a></li>
                    <li><a :href="fb" class="text-white">Like on Facebook</a></li>
                    <li><a :href="twitter" class="text-white">Follow on Twitter</a></li>
                </ul>
                </div>
            </div>
            </div>
        </div>
        <div class="navbar navbar-dark bg-dark shadow-sm">
            <div class="container">
            <a href="#" class="navbar-brand d-flex align-items-center">
                <img src="../assets/feline.jpg" width="40" height="40" style="border-radius:10px;"/>
                <strong style="padding-left:10px">All about Felines... Meowwww!!!</strong>
            </a>
            <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            </div>
        </div>
    </header>
    <!-- Main content -->
    <main>
        <div class="row">
            <section class="py-3 text-center container col-8">
                <div v-if="store.state.error.status>0" class="alert alert-warning" role="alert" v-on:click="clearError">
                    {{ $store.state.error.message }}
                </div>
            </section>
        </div>
        <div class="row">
            <div class="col">
                <section class="py-3 text-center container col-8">
                    <p class="alert alert-primary">Select where to open the details page.</p>
                </section>
                <section class="row text-center container col-8" style="margin:auto;">
                    <div class="col">
                        <div class="form-check">
                            <input v-on:click="toggelModal(false)" :checked="!$store.getters.getModality" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                            <label class="form-check-label" for="flexRadioDefault1">
                                New Page
                            </label>
                        </div>
                        <div class="form-check">
                            <input v-on:click="toggelModal(true)" :checked="$store.getters.getModality" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2">
                            <label class="form-check-label" for="flexRadioDefault2">
                                Modal
                            </label>
                        </div>
                    </div>
                    <div class="col">
                        <Dropdown />
                    </div>
                </section>
            </div>
            <div class="col">
                <section class="py-2 text-center container col-10" style="margin-left:0px">
                    <div class="row py-lg-2">
                        <img class="col" src="../assets/teacher.webp" style="width:200px"/>
                        <p class="col alert alert-warning">Cats are known for their agility, grooming rituals, and the comforting rhythm of their purrs. With a keen sense of independence, these feline companions have woven themselves into the fabric of human households worldwide.</p>
                    </div>
                </section>
            </div>
        </div>
        <div class="album py-5 bg-body-tertiary">
            <div class="container">
                <div class="text-center" v-if="$store.getters.getImages.length>0">
                    <h3 style="margin-bottom: 30px;">Breed: {{ $store.getters.getImages[0].name}}</h3>
                </div>
                <div class="text-center" v-if="$store.getters.getImages.length<1">
                    <p>Are you looking for my kind??? Catch me if you can!!!</p>
                    <p><img style="border-radius:20px;" src="../assets/running.gif" /></p>
                </div>
                <div v-else class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    <div class="col" v-for="image in $store.getters.getImages" :key="image.id">
                        <Card :name="image.name" :id="image.id" :imageUrl="image.url" :origin="image.origin" :temperament="image.temperament" :description="image.description" :height="image.height" :width="image.width"/>
                    </div>
                </div>
                <div v-if="$store.getters.getImages.length>=1" class="text-center py-3">
                    <button style="width:50%;margin-top:30px;" v-if="$store.state.page > -1" type="button" class="btn btn-primary" v-on:click="loadMore">
                        Load more
                    </button>
                </div>
            </div>
        </div>
        
    </main>
    <!-- Footer -->
    <footer class="text-body-secondary py-5">
        <div class="container">
            <p class="float-end mb-1">
                <a href="#">Back to top</a>
            </p>
            <p class="mb-1 col-6">UI experience is powered by Bootsrap 5, unfortunately BootstrapVue still have very little support for Vue3. So this is why I decided to use the old bootstrap.</p>
        </div>
    </footer>
  </div>
</template>


<script setup lang="ts">
    // @ts-ignore
    import Dropdown from '../components/DropDown.vue';
    // @ts-ignore
    import Card from '../components/Card.vue';
    // @ts-ignore
    import { useStore } from 'vuex';
    // @ts-ignore
    import * as SocialMedia from '../utils/social_media.tsx';

    const email = SocialMedia.email;
    const fb = SocialMedia.fb;
    const twitter = SocialMedia.twitter;
    const store = useStore();
    
    function toggelModal(value: any) {
        store.commit('toggleModal', value);
    }
    function loadMore() {
        const breedId = store.state.breedId;
        store.dispatch('fetchImages', { breedId, method: 'append' });
    }
    function clearError() {
        store.commit('showError', { message: '', status: 0 })
    }
</script>
