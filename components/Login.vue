<template>
  <div>
    <div class="container login-page">
     <h1 class="gojo-admin"> GOJO Admin</h1>
      <div class="wrapper">
        <div class="title-text">
          <div class="title login">Login</div>
        </div>

        <div class="form-container">
          <div class="form-inner">
            <form action="#" @submit.prevent="attemptLogin" class="login">
              <div class="field">
                <input id="uname" v-model="username" autocomplete="off" type="text" maxlength="22" required />
                <label>User Name</label>
              </div>
              <div class="field box-pass">
                <input
                  id="lpass"
                  class="password"
                  v-model="password"
                  :type="passwordFieldType"
                  maxlength="8"
                  required
                />
                <label>Password</label>
                <i class="icon-password mdi mdi-eye-off-outline" :class="passwordFieldType === 'password' ? 'mdi mdi-eye-off-outline' : 'mdi mdi-eye-outline'" @click="togglePasswordVisibility"></i>
              </div>
              <div class="check-boxx">
                <input type="checkbox" id="scales" name="scales" checked />
                <label for="scales">Remember me</label>
              </div>
              
              <div class="field">
                <input class="btn-login" type="submit" :class="{ 'btn-loading': loading }" :disabled="loading" :value="loading ? '' : 'Login'" />
                <i v-if="loading" class="mdi mdi-spin"></i>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      passwordFieldType: 'password',
    };
  },
  methods: {
    ...mapActions('auth', ['login']),

    togglePasswordVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    },

    async attemptLogin() {
      this.loading = true;
      try {
        await this.login({
          username: this.username,
          password: this.password,
          
        });
        // Redirect or do something else based on successful login
      } catch (error) {
        console.error('Failed to login:', error);
        // Handle the error
      }finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
