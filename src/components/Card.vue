<template>
  <div>
    <div class="card shadow-sm">
      <img :src='imageUrl' @load="onImageLoad">
      <div class="card-body">
        <p class="card-text">{{truncatedDescription}}</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <router-link v-if="!$store.getters.getModality" :to="{name: 'details', params: { id }  }" class="btn btn-sm btn-outline-secondary">View details</router-link>
            <button v-else type="button" class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="`#modalWin${id}`">
                View in Modal
            </button>
          </div>
          <small class="text-body-secondary" v-if="renderComponent">
              {{ loadTime }} ms
          </small>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div v-if="$store.getters.getModality" class="modal fade" :id="`modalWin${id}`" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">{{name}}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card shadow-sm">
                    <img :src='imageUrl'>
                    <div class="card-body">
                        <h5 class="card-text">Origin: {{origin}}</h5>
                        <p class="card-text">{{temperament}}</p>
                        <p class="card-text">{{description}}</p>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, computed, nextTick, ref, toRefs } from 'vue';
  import { useStore } from 'vuex';

  let loadTime = '';
  let startTime = 0;
  let renderComponent = ref(false);
  const store = useStore();
  
  const forceRender = async () => {
    renderComponent.value = false;
    await nextTick();
    renderComponent.value = true;
  };
  
  const props = defineProps({
      name: String,
      id: String,
      imageUrl: String,
      width: Number,
      height: Number,
      origin: String,
      temperament: String,
      description: String,
  });
  
  const { description } = toRefs(props);
  
  onMounted(() => {
      startTime = performance.now();
  });
  
  const truncatedDescription = computed(() => {
    return (description.value.length > 100) ? `${description.value.slice(0, 100-1)}...` : description.value;
  })
  function onImageLoad() {
      loadTime = (performance.now() - startTime).toFixed(2);
      forceRender();
  }
</script>

<style scoped>
  .card img {
    aspect-ratio: 1/1;
    object-fit: cover;
  }
  
  .card:hover {
    border-color: rgb(13, 110, 253);
    box-shadow: 0px 0px 10px 2px rgb(13, 110, 253) !important;
  }
</style>
