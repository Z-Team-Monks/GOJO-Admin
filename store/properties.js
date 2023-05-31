// properties.js

export const state = () => ({
    properties: [],
    loading: false,
  });
  
  export const mutations = {
    SET_PROPERTIES(state, properties) {
      state.properties = properties;
    },
    SET_LOADING(state, value) {
      state.loading = value;
    },
  };
  
  export const actions = {
    async fetchProperties({ commit }) {
      commit('SET_LOADING', true);
      try {
        const res = await fetch('http://192.168.50.207:8000/api/v1/properties/');
        const data = await res.json();
  
        // Check if the response status is OK
        if (res.ok) {
          commit('SET_PROPERTIES', data);
        } else {
          throw new Error(data.message || 'Failed to get properties');
        }
      } catch (error) {
        console.error('An error occurred:', error.message);
        // Handle error...
      } finally {
        commit('SET_LOADING', false);
      }
    },
  };
  
  export const getters = {
    properties: (state) => state.properties,
    loading: (state) => state.loading,
  };
  