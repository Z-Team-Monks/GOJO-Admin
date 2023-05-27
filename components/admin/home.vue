<template>
  <div class="dashboard">
    <navbar />
    <sidebar />
    <main class="s-layout__content">
      <div class="row m-5">
        <div class="col-sm-4" v-for="content in cardContent" :key="content.id">
          <card :content="content" />
        </div>
        <div class="col-12 mt-5">
          <tabs class="nav-pills nav-fill" :data="tabsData"></tabs>
          <div class="tab-content p-3">
            <div class="tab-pane fade show active" id="all">
              <Table :users="userList" :columns="columns" />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import card from "../elements/card.vue";
import tabs from "../elements/tab.vue";
import sidebar from "../elements/sidebar.vue";
import Navbar from "../elements/navbar.vue";
import Table from "../elements/users-table.vue";

import { mapGetters,mapActions } from 'vuex';

export default {
  components: { card, tabs, sidebar, Navbar, Table },
  name: "home",

  data() {
    return {
      columns: ["First Name", "Last Name", "Phone", "Role", "Status"],
      // users: [
      //   {
      //     id: "1",
      //     age: "21-12-2022",
      //     name: "Shad Jast Bahil...",
      //     email: "Software and Information Technology",
      //     status: "Active",
      //   },
      //   {
      //     id: "2",
      //     age: "21-12-2022",
      //     name: "Duane Metz Aerz...",
      //     email: "Software and Information Technology",
      //     status: "Deactive",
      //   },
      //   {
      //     id: "3",
      //     age: "21-12-2022",
      //     name: "Myah Kris Brown...",
      //     email: "Software and Information Technology",
      //     status: "Active",
      //   },
      //   {
      //     id: "4",
      //     age: "21-12-2022",
      //     name: "Dr. Kamron Wunsch",
      //     email: "Software and Information Technology",
      //     status: "Deactive",
      //   },
      //   {
      //     id: "5",
      //     age: "21-12-2022",
      //     name: "David Pella Der....",
      //     email: "Software and Information Technology",
      //     status: "Active",
      //   },
      //   {
      //     id: "6",
      //     age: "21-12-2022",
      //     name: "Richard Jacob Yakor...",
      //     email: "Software and Information Technology",
      //     status: "Deactive",
      //   },
      // ],
      cardContent: [
        {
          id: "1",
          title: "End Users",
          icon: "mdi mdi-account-multiple-outline mdi-48px card-i",
          value: "92, 680",
          subscript: "+300 (26,80%)",
        },
        {
          id: "2",
          title: "Financial Managers",
          icon: "mdi mdi mdi-eye-outline mdi-48px card-i",
          value: "680",
          subscript: "+20 (16,20%)",
        },
        {
          id: "3",
          title: "Listing Managers",
          icon: "mdi mdi-chart-bar mdi-48px card-i",
          value: "380",
          subscript: "+24 (0.74%)",
        },
      ],
      tabsData: [
        {
          id: "all",
          title: "All",
          active: true,
        },
        {
          id: "activee",
          title: "Active",
        },
        {
          id: "deactivee",
          title: "Deactive",
        },
      ],
    };
  },
  created(){
    this.currentUser
    if (process.browser) {
      this.fetchUserData();
    }
  },
  computed: {
    ...mapGetters('auth',['isAuthenticated', 'currentUser']),
    userList: {
      get() {
        return this.currentUser;
      },
      set(value) {
        // You can handle the setter logic if required
        // For example, if you want to update the userList in the store
        this.$store.commit('auth/setUser', value);
      }
    }
  },

  methods: {
    ...mapActions('auth',['fetchUser']),
    fetchUserData() {
      if (localStorage && localStorage.getItem('token')) {
        this.fetchUser()
          .then(() => {
            // Assign the fetched user data to userList
            this.userList = this.$store.state.auth.user;
            console.log('User data fetched successfully');
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>