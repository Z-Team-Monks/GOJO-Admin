<template>
    <div>
        <Nuxt />
      <!-- Success message -->
      <transition name="fade">
        <div class="toast success-msg" v-if="successMessage">
          <i class="fa fa-check"></i>
          {{ successMessage }}
        </div>
      </transition>

      <transition name="fade">
        <div class="toast success-msg" v-if="updateSuccess">
          <i class="fa fa-check"></i>
          {{ updateSuccess }}
        </div>
      </transition>
  
      <!-- Error message -->
      <transition name="fade">
        <div class="toast error-msg" v-if="updateError">
          <i class="fa fa-times-circle"></i>
          {{ updateError }}
        </div>
      </transition>

      <transition name="fade">
        <div class="toast error-msg" v-if="errorMessage">
          <i class="fa fa-times-circle"></i>
          {{ errorMessage }}
        </div>
      </transition>

      <transition name="fade">
            <div class="toast loading-msg" v-if="loading">
                <i class="mdi mdi-spin fa-spin"></i>
                Loading...
            </div>
        </transition>
    </div>
   
    
  </template>
  
  <script>
  import { mapState } from 'vuex';
  
  export default {
    name: "Index",
    date(){
  return{
    toastDuration: 5000, // Duration of the toast
  }
    },
    computed: {
      ...mapState('auth', {
        errorMessage: state => state.error,
        successMessage: state => state.successMessage,
        loading: state => state.updateLoading,
        updateError: state=> state.updateError,
        updateSuccess: state => state.updateSuccess

      }),
    },
    watch: {
      errorMessage(newValue) {
        if(newValue) {
          setTimeout(() => {
            this.$store.commit('auth/setError', null);
          }, 5000);
        }
      },
      successMessage(newValue) {
        if(newValue) {
          setTimeout(() => {
            this.$store.commit('auth/setSuccessMessage', null);
          }, 5000);
        }
      },
      updateError(newValue) {
        if(newValue) {
          setTimeout(() => {
            this.$store.commit('auth/setUpdateError', null);
          }, 5000);
        }
      },
      updateSuccess(newValue) {
        if(newValue) {
          setTimeout(() => {
            this.$store.commit('auth/setUpdateSuccess', null);
          }, 5000);
        }
      },
      loading(newValue) {
        this.$store.commit('auth/setUpdateLoading', newValue);
    },
    },
  };
  </script>
  <style lang="scss" scoped>
  .toast {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 15px;
    border-radius: 5px;
    color: white;
    z-index: 10000;
  }
  
  .success-msg {
    background-color: #4CAF50;
  }
  
  .error-msg {
    background-color: #f44336;
  }

  .loading-msg {
    background-color: #3f51b5; // you can change this color
    .fa-spinner {
        animation: spin 1s infinite linear;
    }
}
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .toast:not(.show) {
      display: flex;
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
  </style>
  