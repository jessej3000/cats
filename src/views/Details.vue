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
            <div class="album py-5 bg-body-tertiary">
                <div class="container">
                    <div class="card shadow-sm">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-outline-secondary" v-on:click="$router.go(-1)">Back</button>
                                </div>
                                <small class="text-body-secondary" v-if="renderComponent">
                                    {{ loadTime }} ms
                                </small>
                            </div>
                        </div>
                        <img :src="details.url"  @load="onImageLoad">
                        <div class="card-body">
                            <h2 class="card-text">{{ details.name }}</h2>
                            <h5 class="card-text">Origin: {{ details.origin }}</h5>
                            <p class="card-text">{{ details.temperament }}</p>
                            <p class="card-text">{{ details.description }}</p>
                            <p class="card-text">{{ response }}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-outline-secondary" v-on:click="$router.go(-1)">Back</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <!-- Footer -->
        <footer class="text-body-secondary py-5">
        </footer>
    </div>
</template>

<script setup lang="ts">
    // @ts-ignore
    import { onMounted, nextTick, ref } from 'vue';
    // @ts-ignore
    import * as SocialMedia from '../utils/social_media.tsx';
    // @ts-ignore
    import { useRoute } from 'vue-router';
    // @ts-ignore
    import { useStore } from 'vuex';

    const email = SocialMedia.email;
    const fb = SocialMedia.fb;
    const twitter = SocialMedia.twitter;
    const router = useRoute();
    const store = useStore();
    let response = '';
    let details: {
        url: string,
        name: string,
        origin: string,
        temperament: string,
        description: string,
    } = {
        url: '',
        name: '',
        origin: '',
        temperament: '',
        description: '',
    };
    
    let loadTime = '';
    let startTime = 0;
    let renderComponent = ref(false);

    const forceRender = async () => {
        renderComponent.value = false;
        await nextTick();
        renderComponent.value = true;
    };
    
    onMounted(() => {
        startTime = performance.now();
        const images = store.getters.getImages;
        details = {...images.find((image: any) => image.id === router.params.id)};
        forceRender()
    });
  
    function onImageLoad() {
        loadTime = (performance.now() - startTime).toFixed(2);
        forceRender(); 
    }
</script>
