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
          <div class="row">
            <div class="col-12">
              <h4>Users</h4>
            </div>
          </div>
          <tabs class="nav-pills nav-fill" :data="tabsData"></tabs>
          <div class="tab-content p-3">
          <div class="tab-pane fade show active" id="all">
          <table classs="table">
            <thead>
              <tr>
                <th align="left">
                  <input type="checkbox" v-model="selectAll" />
                </th>
                <th v-for="column in columns" :key="column">
                  <span
                   class="colss"
                    
                    
                  >
                    {{ column }}
                </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td style="width: 3%">
                  <input
                    type="checkbox"
                    v-model="selected"
                    :value="user.id"
                    number
                  />
                </td>
                <td>
                  <img src="https://cdn-icons-png.flaticon.com/512/219/219988.png" class="mr-2" width="40" alt="">
                  {{ user.name }}
                </td>
                <td>
                  <strong>{{ user.email }}</strong> <br /><span
                    class="dept-span"
                    >{{ user.email }}</span
                  >
                </td>
                <td>{{ user.age }}</td>
                <td v-if="user.status == 'Active'">
                  <span class="active-stat">{{ user.status }}</span>
                </td>
                <td v-if="user.status == 'Deactive'">
                  <span class="deactive-stat">{{ user.status }}</span>
                </td>
              </tr>
            </tbody>
            
          </table>
          <nav aria-label="Page navigation nav-style" class="pagination-wrapper">
              <ul class="pagination">
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                  </a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import card from "../elements/card.vue";
import tabs from "../elements/tab.vue"
import sidebar from "../elements/sidebar.vue"
import Navbar from '../elements/navbar.vue';
export default {
  components: { card , tabs, sidebar, Navbar},
  name: "home",

  data() {
    return {
      sortKey: "",
      reverse: false,

      search: "",
      selected: [],
      columns: ["Employee", "Title / Department", "Last Active Date", "Status"],
      users: [
        {
          id: "1",
          age: "21-12-2022",
          name: "Shad Jast Bahil...",
          email: "Software and Information Technology",
          status: "Active",
        },
        {
          id: "2",
          age: "21-12-2022",
          name: "Duane Metz Aerz...",
          email: "Software and Information Technology",
          status: "Deactive",
        },
        {
          id: "3",
          age: "21-12-2022",
          name: "Myah Kris Brown...",
          email: "Software and Information Technology",
          status: "Active",
        },
        {
          id: "4",
          age: "21-12-2022",
          name: "Dr. Kamron Wunsch",
          email: "Software and Information Technology",
          status: "Deactive",
        },
        {
          id: "5",
          age: "21-12-2022",
          name: "David Pella Der....",
          email: "Software and Information Technology",
          status: "Active",
        },
        {
          id: "6",
          age: "21-12-2022",
          name: "Richard Jacob Yakor...",
          email: "Software and Information Technology",
          status: "Deactive",
        },
      ],
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
  computed: {
    selectAll: {
      get: function () {
        return this.users ? this.selected.length == this.users.length : false;
      },
      set: function (value) {
        var selected = [];

        if (value) {
          this.users.forEach(function (user) {
            selected.push(user.id);
          });
        }

        this.selected = selected;
      },
    },
    orderedUsers: function () {
      return this.users, this.sortKey, this.reverse ? "asc" : "desc";
    },
  },
  filters: {
    capitalize: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  methods: {
    sortBy: function (sortKey) {
      this.reverse = this.sortKey == sortKey ? !this.reverse : false;

      this.sortKey = sortKey;
    },
    isActive: function (column) {
      return this.sortKey == column;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>