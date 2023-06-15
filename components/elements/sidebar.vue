<template>
  <div class="s-layout__sidebar">
    <a class="s-sidebar__trigger" href="#0">
      <i class="fa fa-bars"></i>
    </a>
    <nav class="s-sidebar__nav mt-5">
      <ul>
        <div>
          <nuxt-link v-if="isGeneral" to="/dashboard/home">
            <li>
              <a class="s-sidebar__nav-link" href="#0">
                <img
                  src="../../assets/images/users.svg"
                  width="30"
                  height="30"
                  class="sidebar-img"
                  alt=""
                />
              </a>
            </li>
          </nuxt-link>
        </div>
        <div>
          <nuxt-link v-if="!isFinancial" to="/dashboard/properties">
            <li>
              <a class="s-sidebar__nav-link" href="#0">
                <img
                  src="../../assets/images/houses.svg"
                  width="30"
                  height="30"
                  class="sidebar-img"
                  alt=""
                />
              </a>
            </li>
          </nuxt-link>
        </div>
        <div>
          <nuxt-link to="/dashboard/profile">
            <li>
              <a class="s-sidebar__nav-link" href="#0">
                <img
                  src="../../assets/images/settings.svg"
                  width="30"
                  height="30"
                  class="sidebar-img"
                  alt=""
                />
              </a>
            </li>
          </nuxt-link>
        </div>
        <div>
          <nuxt-link v-if="!isListing" to="/dashboard/transaction">
            <li>
              <a class="s-sidebar__nav-link" href="#0">
                <img
                  src="../../assets/images/money.svg"
                  width="30"
                  height="30"
                  class="sidebar-img"
                  alt=""
                />
              </a>
            </li>
          </nuxt-link>
        </div>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({}),
  computed: {
    ...mapGetters("auth", ["currentUser"]),
    isGeneral() {
      return this.currentUser?.role == 5;
    },
    isListing() {
      return this.currentUser?.role == 4;
    },
    isFinancial() {
      return this.currentUser?.role == 3;
    },
  },
};
</script>
