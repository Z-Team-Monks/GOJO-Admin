// properties.js
import axios from "axios";


export const state = () => ({
    properties: [],
    loading: false,
    allCategories: [],
    allFacilities:[]
  });

  export const mutations = {
    SET_PROPERTIES(state, properties) {
      state.properties = properties;
    },
    SET_LOADING(state, value) {
      state.loading = value;
    },
    SET_CATEGORIES(state, categories) {
      state.allCategories = categories
    },
    SET_FACILITIES(state, facilities){
      state.allFacilities = facilities
    },
    addCategory(state, category) {

      if (Array.isArray(state.allCategories)) {
        state.allCategories.push(category)
      } else {
        console.error("Error: state.categories is not an array");
      }
      
    },
    removeCategory(state, categoryId) {
      state.allCategories = state.allCategories.filter(category => category.id !== categoryId);
    },
    UPDATE_CATEGORY(state, updatedCategory) {
      const index = state.allCategories.findIndex(category => category.id === updatedCategory.id);
      if (index !== -1) {
          state.allCategories.splice(index, 1, updatedCategory);
      }
  },
  addFacility(state, category) {

    if (Array.isArray(state.allFacilities)) {
      state.allFacilities.push(category)
    } else {
      console.error("Error: state.categories is not an array");
    }
    
  },
  removeFacility(state, facilityId) {
    state.allFacilities = state.allFacilities.filter(facility => facility.id !== facilityId);
  },
  UPDATE_FACILITY(state, updatedFacility) {
    const index = state.allFacilities.findIndex(facility => facility.id === updatedFacility.id);
    if (index !== -1) {
        state.allFacilities.splice(index, 1, updatedFacility);
    }
  }
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

        const URL = `http://34.163.240.198/api/v1/properties/${id}/`;
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
    async fetchCategories({ commit }) {
      try {
        const response = await fetch("http://34.163.240.198/api/v1/properties/categories/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          const data = await response.json();
          commit("SET_CATEGORIES", data.results); // Assumes the API returns the categories directly
          console.log(data)
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation: ", error);
      }
    },
    async addCategory({ commit, rootState }, category) {
      try {
        const response = await fetch("http://34.163.240.198/api/v1/properties/categories/", {
          method: 'POST',
          headers: {
            'Authorization': `Token ${rootState.auth.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(category) // convert the category object to JSON
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          const data = await response.json();
          commit("addCategory", data);
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation: ", error);
      }
    },
    async deleteCategory({ commit }, categoryId) {
      try {
        const response = await fetch(`http://34.163.240.198/api/v1/properties/categories/${categoryId}/`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          commit("removeCategory", categoryId);
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation: ", error);
      }
    },
    async updateCategory({commit, rootState}, name) {
      console.log(name)
      const url = `http://34.163.240.198/api/v1/properties/categories/${name.name.id}/`;
      console.log(url)
      const response = await fetch(url, {
          method: 'PATCH',
          headers: {
            'Authorization': `Token ${rootState.auth.token}`,
              'Content-Type': 'application/json',
              // Add any necessary headers here like auth tokens etc.
          },
          body: JSON.stringify({
              name: name.name.name
          })
      });
      
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      } else {
          const data = await response.json();
          commit('UPDATE_CATEGORY', data);
      }
  },
    async fetchFacilities({ commit }) {
      try {
        const response = await fetch("http://34.163.240.198/api/v1/properties/facilities/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          const data = await response.json();
          commit("SET_FACILITIES", data.results); // Assumes the API returns the categories directly
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation: ", error);
      }
    },
    async addFacility({ commit, rootState }, category) {
      try {
        const response = await fetch("http://34.163.240.198/api/v1/properties/facilities/", {
          method: 'POST',
          headers: {
            'Authorization': `Token ${rootState.auth.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(category) // convert the category object to JSON
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          const data = await response.json();
          commit("addFacility", data);
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation: ", error);
      }
    },
    async deleteFacility({ commit }, facilityId) {
      try {
        const response = await fetch(`http://34.163.240.198/api/v1/properties/facilities/${facilityId}/`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          commit("removeFacility", facilityId);
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation: ", error);
      }
    },
    async updateFacility({commit, rootState}, name) {
      console.log(name)
      const url = `http://34.163.240.198/api/v1/properties/facilities/${name.name.id}/`;
      console.log(url)
      const response = await fetch(url, {
          method: 'PATCH',
          headers: {
            'Authorization': `Token ${rootState.auth.token}`,
              'Content-Type': 'application/json',
              // Add any necessary headers here like auth tokens etc.
          },
          body: JSON.stringify({
              name: name.name.name
          })
      });
      
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      } else {
          const data = await response.json();
          commit('UPDATE_FACILITY', data);
      }
  },
  };

  export const getters = {
    properties: (state) => state.properties,
    loading: (state) => state.loading,
    categories: (state) => state.allCategories,
    facilities: (state) => state.allFacilities
  };
