import { createStore } from 'vuex'
import axios from 'axios'

// This is not the ideal place for these information, but it is a good place for now.
// Just for the purpose of this demo.
const CATS_API_KEY = 'live_1ScrFz4vDesm7RwJsyFxHUk6E3WzlZCgAFio4cIjLL3mYN8b4iYjUaPh7FJ958Uf'
const CATS_API_HOST = 'https://api.thecatapi.com/v1'

const store = createStore({
  state: {
    breeds: [],
    images: [],
    breedId: '',
    isModal: false,
    page: 0,
    error: {
      message: '',
      status: 0
    }
  },
  mutations: {
    updateBreeds: (state, breeds: never[]) => {
      state.breeds = [...breeds]
    },
    updateImages: (state, images: never[]) => {
      state.images = [...images]
    },
    updateBreedId: (state, breedId: string) => {
      state.breedId = breedId
    },
    toggleModal: (state, isModal: boolean) => {
      state.isModal = isModal
    },
    updatePage: (state, page: number) => {
      state.page = page
    },
    showError: (state, error) => {
      state.error.message = error.message
      state.error.status = error.status
    }
  },
  actions: {
    fetchBreeds: async ({ commit }) => {
      await axios.get(`${CATS_API_HOST}/breeds`)
        .then((res) => {
          const result = res.data.map(
            (data: any) => {
              return { id: data.id, name: data.name }
            }
          )
          commit('updateBreeds', result)
        })
        .catch((err) => {
          commit('showError', { message: err.message, status: 1001 })
        })
    },
    fetchImages: async ({ commit, state }, payload) => {
      const limit = 6 // record limit per query
      await axios.get(`${CATS_API_HOST}/images/search?breed_ids=${payload.breedId}&order=ASC&limit=${limit}&page=${state.page}&api_key=${CATS_API_KEY}`)
        .then((res) => {
          const result = res.data.map(
            (data: any) => {
              return {
                id: data.id,
                url: data.url,
                name: data.breeds[0].name,
                origin: data.breeds[0].origin,
                temperament: data.breeds[0].temperament,
                description: data.breeds[0].description,
                width: data.width,
                height: data.height
              }
            }
          )
          if (result.length < limit) {
            commit('updatePage', -1)
          } else {
            commit('updatePage', state.page + 1)
          }
          if (payload.method === 'new') {
            commit('updateImages', result)
          } else {
            const tempImages = [...state.images, ...result]
            commit('updateImages', tempImages)
          }
        })
        .catch((err) => {
          commit('showError', { message: err.message, status: 1002 })
        })
    }
  },
  getters: {
    getBreeds: (state) => {
      return state.breeds
    },
    getDetails: (state) => {
      return state.images
    },
    getImages: (state) => {
      return state.images
    },
    getModality: (state) => {
      return state.isModal
    },
    getBreedId: (state) => {
      return state.breedId
    }
  },
  modules: {}
})

export default store
