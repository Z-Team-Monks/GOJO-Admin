// transaction.js

export const state = () => ({
    transactions: [],
    loading: false,
  });

  export const mutations = {
    SET_TRANSACTIONS(state, transactions) {
      state.transactions = transactions;
    },
    SET_LOADING(state, value) {
      state.loading = value;
    },
  };

  export const actions = {
    async getTransactions({ commit }) {
      commit('SET_LOADING', true);
      try {
        const res = await fetch('https://api.natnaelabay.com/api/v1/transactions/');
        const data = await res.json();

        // Check if the response status is OK
        if (res.ok) {
          commit('SET_TRANSACTIONS', data);
        } else {
          throw new Error(data.message || 'Failed to get transactions');
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
    transactions: (state) => state.transactions,
    loading: (state) => state.loading,
  };
