export const state = () => ({
    error: null,
    token: null,
    user: null,
    loading: false,
  })


  export const getters = {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user,
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
    }
  }
  
  export const actions = {
    async login({ commit }, { username, password}) {
      try {
        const response = await fetch('https://api.natnaelabay.com/api/v1/users/login/', {
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
      localStorage.setItem('token', data.token);

  
        // You would usually save the token here
        commit('setToken', data.token)
  
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
          const response = await fetch('https://api.natnaelabay.com/api/v1/users/', {
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

      async logout({ commit }) {
        try {
          // Fetch user information from the '/user/me/' endpoint
          const response = await fetch('https://api.natnaelabay.com/api/v1/users/me/', {
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
          const logoutResponse = await fetch('https://api.natnaelabay.com/api/v1/users/logout/', {
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
  }
  