export const state = () => ({
    error: null,
    token: null,
    user: null,
    loading: false,
    updateError: null,
    updateSuccess: false,
    deleteError: null,
    deleteSuccess: false,
    postError: null,
    postSuccess: false,
    currentUser: {},
    getError: null,
    getSuccess: false
  })


  export const getters = {
    isAuthenticated: (state) => !!state.token,
    currentUser0: (state) => state.user,
    getUpdateError: state => state.updateError,
    getUpdateSuccess: state => state.updateSuccess,
    getDeleteSuccess: (state) => state.deleteSuccess,
    getDeleteError: (state) => state.deleteError,
    getPostSuccess: (state) => state.postSuccess,
    getPostError: (state) => state.postError,
    currentUser: (state) => state.currentUser,
    getSuccess: (state) => state.getSuccess,
    getError: (state) => state.getError,
  };

  export const mutations = {
    setError(state, error) {
      state.error = error
    },
    setToken(state, token) {
      state.token = token
      if(token) {
        this.$router.push('/dashboard/home'); // Redirects to the dashboard after successful login
      }
    },
    setUser(state, user) {
      state.user = user
    },
    setLoading(state, isLoading) {
        state.loading = isLoading;
      },
    clearUser(state){
        state.user = null
    },
    setUpdateError(state, error) {
      state.updateError = error;
    },
    setUpdateSuccess(state, status) {
      state.updateSuccess = status;
    },
    setDeleteSuccess(state, value) {
      state.deleteSuccess = value;
    },
    setDeleteError(state, value) {
      state.deleteError = value;
    },
    setPostSuccess(state, value) {
      state.postSuccess = value;
    },
    setPostError(state, value) {
      state.postError = value;
    },
    setPostSuccess(state, value) {
      state.postSuccess = value;
    },
    setPostError(state, value) {
      state.postError = value;
    },
    setCurrentUser(state, value) {
      state.currentUser = value;
    },
    setGetSuccess(state, value) {
      state.getSuccess = value;
    },
    setGetError(state, value) {
      state.getError = value;
    },
  }

  export const actions = {
    async login({ commit, state }, { username, password}) {
      try {
        const response = await fetch(`${this.$config.baseUrl}/users/admin_login/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        })

        if (!response.ok) {
          // Convert non-2xx HTTP response into an error
          const error = new Error('An error occurred while attempting to login')
          error.response = response
          throw error
        }

        const data = await response.json()

        // Save the token in localStorage
      localStorage.setItem('token', data.user.token);
       console.log(data)

        // You would usually save the token here
        commit('setToken', data.user.token)

        // You would usually save the user data here
        commit('setUser', data.user)

        // Reset the error
        commit('setError', null)
      } catch (error) {
        // Handle error
        commit('setError', error.message)
      }
    },
    async fetchUser({ commit, state }) {
        try {
            commit('setLoading', true);
            const token = localStorage.getItem('token');
            if (!token) {
              throw new Error('Token not found');
            }
          const response = await fetch(`${this.$config.baseUrl}/users/`, {
            method: 'GET',
            headers: {
              'Authorization': `Token ${token}`,
              'Content-Type': 'application/json',
            },
          })

          if (!response.ok) {
            const error = new Error('An error occurred while attempting to fetch user data')
            error.response = response
            throw error
          }

          const data = await response.json()

          // Save the user data
          commit('setUser', data)
          commit('setLoading', false);
        } catch (error) {
          console.error(error.message)
          commit('setLoading', false);
        }
      },

      async logout({ commit ,state}) {
        try {
          // Fetch user information from the '/user/me/' endpoint
          const response = await fetch(`${this.$config.baseUrl}/users/me/`, {
            headers: {
              'Authorization': `Token ${localStorage.getItem('token')}`
            },
          });

          if (!response.ok) {
            const error = new Error('An error occurred while fetching user information');
            error.response = response;
            throw error;
          }

          const user = await response.json();

          // Create the data object in the required format
          const data = {
            first_name: user.first_name,
            last_name: user.last_name,
            role: user.role,
            password: user.password,
            phone: user.phone
          };

          // Send the logout request
          const logoutResponse = await fetch(`${this.$config.baseUrl}/users/logout/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

          if (!logoutResponse.ok) {
            const error = new Error('An error occurred while logging out');
            error.response = logoutResponse;
            throw error;
          }

          // Clear the token from local storage
          localStorage.removeItem('token');

          // Commit the mutation to clear the user data
          commit('clearUser');

          // Redirect to the homepage
          // Replace '/homepage' with the actual route to your homepage
          this.$router.push('/');
        } catch (error) {
          console.error(error);
        }
      },
      async createUser({ commit, dispatch,state }, user) {

        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const url = `${this.$config.baseUrl}/users/`;
        const options = {
          method: 'POST',
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        };
        try {
          const response = await fetch(url, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          // You may want to retrieve the response body depending on the API design.
          commit('setPostSuccess', true);
          commit('setPostError', null);
          dispatch('fetchUser')
        } catch (error) {
          commit('setPostSuccess', false);
          commit('setPostError', error.message);
        }
      },
      updateUser({ commit, dispatch,state }, userData) {
        const token = localStorage.getItem('token');
            if (!token) {
              throw new Error('Token not found');
            }
        const url = `${this.$config.baseUrl}/users/${userData.id}/`;
        const options = {
          method: 'PATCH',
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        };
        fetch(url, options)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((json) => {
            commit('setUser', json);
            dispatch('fetchUser')
            dispatch('fetchCurrentUser')
            commit('setUpdateSuccess', true);
            commit('setUpdateError', null);
          })
          .catch((error) => {
            commit('setUpdateSuccess', false);
            commit('setUpdateError', error.message);
          });
      },
      async deleteUser({ commit, dispatch,state }, userId) {
        const token = localStorage.getItem('token');
            if (!token) {
              throw new Error('Token not found');
            }
        const url = `${this.$config.baseUrl}/users/${userId}/`;
        const options = {
          method: 'DELETE',
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          },
        };
        try {
          const response = await fetch(url, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          // You may want to retrieve the response body depending on the API design.
          dispatch('fetchUser')
          commit('setDeleteSuccess', true);
          commit('setDeleteError', null);
        } catch (error) {
          commit('setDeleteSuccess', false);
          commit('setDeleteError', error.message);
        }
      },
      async fetchCurrentUser({ commit, state }) {
        const token = localStorage.getItem('token');
            if (!token) {
              throw new Error('Token not found');
            }
        const url = `${this.$config.baseUrl}/users/me/`;
        const options = {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
            // Include your authentication token here if necessary
          },
        };
        try {
          const response = await fetch(url, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          commit('setCurrentUser', data);
          commit('setGetSuccess', true);
          commit('setGetError', null);
        } catch (error) {
          commit('setGetSuccess', false);
          commit('setGetError', error.message);
        }
      },
  }
