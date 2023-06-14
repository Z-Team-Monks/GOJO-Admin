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
  async fetchTransactions({ commit, state, rootState }) {
    commit("SET_LOADING", true);
    try {
      const token = rootState.auth.token; // get token from local storage
      const res = await fetch("http://34.163.240.198/api/v1/transactions/", {
        headers: {
          Authorization: `Token ${token}`, // attach token to the request
        },
      });
      const data = await res.json();

      // Check if the response status is OK
      if (res.ok) {
        commit("SET_TRANSACTIONS", data);
      } else {
        throw new Error(data.message || "Failed to get transactions");
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
      // Handle error...
    } finally {
      commit("SET_LOADING", false);
    }
  },
  async patchTransaction({ commit, rootState, dispatch }, { id }) {
    commit("SET_LOADING", true);
    try {
      const token = rootState.auth.token; // get token from local storage
      const res = await fetch(
        `${this.$config.baseUrl}/transactions/${id}/release_fund/`,
        {
          method: "POST",
          headers: token
            ? {
                Authorization: `Token ${token}`, // attach token to the request
                "Content-Type": "application/json",
              }
            : {},
        }
      );

      const data = await res.json();

      // Check if the response status is OK
      if (res.ok) {
        // If the response status is OK, commit the UPDATE_TRANSACTION mutation
        dispatch("fetchTransactions");
      } else {
        throw new Error(data.message || "Failed to patch transaction");
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
      // Handle error...
    } finally {
      commit("SET_LOADING", false);
    }
  },
  async patchTransaction(
    { commit, rootState, dispatch },
    { id, transactionData }
  ) {
    commit("SET_LOADING", true);

    try {
      let token;
      if (typeof window !== "undefined") {
        token = rootState.auth.token; // get token from the properties module
      }

      const res = await fetch(`${this.$config.baseUrl}/transactions/${id}/`, {
        method: "PATCH",
        headers: token
          ? {
              Authorization: `Token ${token}`, // attach token to the request
              "Content-Type": "application/json",
            }
          : {},
        body: JSON.stringify(transactionData),
      });

      const data = await res.json();

      // Check if the response status is OK
      if (res.ok) {
        // If the response status is OK, commit the UPDATE_TRANSACTION mutation
        dispatch("fetchTransactions");
      } else {
        throw new Error(data.message || "Failed to patch transaction");
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
      // Handle error...
    } finally {
      commit("SET_LOADING", false);
    }
  },
};

export const getters = {
  getTransactions: (state) => state.transactions,
  loading: (state) => state.loading,
};
