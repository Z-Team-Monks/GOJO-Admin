<template>
  <div>
    <div class="container login-page">
     <h1 class="gojo-admin"> GOJJO Admin</h1>
      <div class="wrapper">
        <div class="title-text">
          <div class="title login">Login</div>
        </div>

        <div class="form-container">
          <div class="form-inner">
            <form action="#" class="login">
              <div class="field">
                <input id="uname" type="text" maxlength="22" required />
                <label>User Name</label>
              </div>
              <div class="field box-pass">
                <input
                  id="lpass"
                  class="password"
                  type="password"
                  maxlength="8"
                  required
                />
                <label>Password</label>
                <i class="icon-password mdi mdi-eye-off-outline"></i>
              </div>
              <div class="check-boxx">
                <input type="checkbox" id="scales" name="scales" checked />
                <label for="scales">Remember me</label>
              </div>
              
              <div class="field">
                <input class="btn-login" type="submit" value="Login" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
};
</script>

<style lang="scss" scoped></style>
