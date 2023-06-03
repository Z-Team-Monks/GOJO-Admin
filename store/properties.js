// properties.js
import axios from "axios";

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
        const res = await fetch('http://34.163.240.198/api/v1/properties/');
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

    async postProperty({ commit, rootState }, {data, id}) {
      commit('SET_LOADING', true);
      try {

        const URL = `http://34.163.240.198/api/v1/properties/${id}`;
        const res = await axios.patch(URL, data,{
          headers: {
            'Authorization': `Token ${rootState.auth.token}`,
            'Content-Type': 'multipart/ form-data',
            // 'Content-Type': 'application/json',
          },

        });
        // Check if the response status is OK
        if (res.data) {
          commit('SET_PROPERTIES', res.data);
        } else {
          throw new Error(res.data.message || 'Failed to get properties');
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
