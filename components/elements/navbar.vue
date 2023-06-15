<template>
  <nav
    class="navbar navbar-light bg-light sticky-top justify-content-between px-2"
  >
    <div>{{ brand }}</div>
    <div class="dropdown">
      <a class="navbar-brand text-right" href="#">
        {{ currentUser?.first_name }} {{ currentUser?.last_name }}
        <img
          src="https://cdn-icons-png.flaticon.com/512/219/219988.png"
          class="ml-3 avatar"
          width="40"
          alt=""
          @click="toggleDropdown"
        />
      </a>
      <div
        class="dropdown-menu dropdown-menu-right"
        :class="{ show: dropdownOpen }"
      >
        <a class="dropdown-item" href="/dashboard/profile">Profile</a>
        <a class="dropdown-item" href="#" @click="handleLogout">Logout</a>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    brand: String,
  },
  computed: {
    ...mapGetters("auth", ["currentUser"]),
  },
  data() {
    return {
      dropdownOpen: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    handleLogout() {
      this.$store.dispatch("auth/logout");
      this.isDropdownOpen = false;
    },
  },
};
</script>

<style>
.avatar {
  cursor: pointer;
}
</style>
