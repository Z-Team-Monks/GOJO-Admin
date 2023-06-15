<template>
  <div>
    <table v-if="isLoading">
      <tr>
        <td>Loading...</td>
      </tr>
    </table>
    <div>
      <div class="table-header">
        <div class="header-row">
          <div>
            <h5 class="m-3">Users</h5>
          </div>
          <div class="header-icons">
            <span class="header-icon" v-if="!searchMode">
              <i class="mdi mdi-magnify" @click="enableSearch"></i>
            </span>
            <span class="header-icon search-container" v-else>
              <input
                type="text"
                v-model="searchTerm"
                placeholder="Search..."
                class="search-input"
               
              />

              <i class="mdi mdi-close" @click="disableSearch"></i>
            </span>
            <i class="mdi mdi-plus" @click="add"></i>
            <div class="icon-separator"></div>
            <i class="mdi mdi-format-align-left"></i>
            <i class="mdi mdi-format-align-justify"></i>
            <i class="mdi mdi-format-align-center"></i>
            <div class="icon-separator"></div>
            <i class="mdi mdi-tune"></i>
            <i class="mdi mdi-download" @click="download"></i>
          </div>
        </div>
      </div>
    </div>
    <div v-if="filterEmployees.results">
      <table v-if="!isLoading && filterEmployees.results.length === 0">
      <tr >
        <td class="p-5"> No users found</td>
      </tr>
    </table>
  
    <table class="table" v-else>
      <thead>
        <tr>
          <th align="left">
            <input type="checkbox" v-model="selectAll" />
          </th>
          <th v-for="column in columns" :key="column">
            <span class="colss">
              {{ column }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filterEmployees.results" :key="user.id">
          <td style="width: 3%">
            <input type="checkbox" v-model="selected" :value="user.id" number />
          </td>
          <td>
            <img
              src="https://cdn-icons-png.flaticon.com/512/219/219988.png"
              class="mr-2"
              width="40"
              alt=""
            />
            <strong>{{ user.first_name }}</strong>
          </td>
          <td>
            {{
              user.last_name 
            }}
          </td>
          <td>
            {{
              user.phone
            }}
          </td>
          <td v-if="user.role == 1">Tenant</td>
          <td v-else-if="user.role == 2">Landlord</td>
          <td v-else-if="user.role == 3">Financial Manager</td>
          <td v-else-if="user.role == 4">Listing Manager</td>
          <td v-else>General Manager</td>
          <td v-if="user.is_active == true">
            <div class="active-stat text-center">
              Active
            </div>
          </td>
          <td v-if="user.is_active == false">
            <div class="deactive-stat text-center">
             Disabled
            </div>
          </td>
          <td class="row">
            <div class="col-sm-6 edit-icon mr-1" @click="showM(user)">
              <i class="mdi mdi-account-edit"></i>
            </div>
              
            <!-- <div class="col-sm-6 delete-icon" @click="showM2(user)">
              <i class="mdi mdi-delete"></i>
            </div> -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
    <user-modal
      :show-modal="showModal"
      :modal-data="user"
      @cancel="cancelModal"
      :cannotUpdateRole="false"
    ></user-modal>
   

    </div>
</template>

<script>
import userModal from "../elements/user-modal.vue";

export default {
  components: { userModal },
  props: {
    users: {
      Type: Array,
      default: () => [],
    },
    columns: {
      Type: Object,
    },
  },

  data() {
    return {
      searchMode: false,
      searchTerm: "",
      sortKey: "",
      reverse: false,
      currentPage: 1,
      rowsPerPage: 10,
      selected: [],
      showModal:false,
      user:[],
      // filteredUsers:[]
    };
  },
//   created() {
//   this.filteredUsers = this.users.results;
// },
  computed: {

    filterEmployees() {
      let users = {...this.users}
      
    if (this.searchTerm === '') 
      return this.users 
      
     users.results = users.results.filter((user) => {
        const fullName = `${user.first_name} ${user.last_name}`;
        const searchName = this.searchTerm.toLowerCase().trim();
        return fullName.toLowerCase().includes(searchName);
      });
    
    console.log(this.searchTerm, users)
    return users
  },
    isLoading() {
      // Return true if the users data is still loading
      // Replace this with the actual loading state from your store
      return this.$store.state.loading;
    },

    pageDisplay() {
      if (!this.users && this.users == undefined) {
        return 0; // Return 0 if users is null or undefined
      }
      const start = (this.currentPage - 1) * this.rowsPerPage + 1;
      const end = Math.min(
        this.currentPage * this.rowsPerPage,
        this.users.count
      );
      return `${start}-${end} of ${this.users.count}`;
    },
    paginatedUsers() {
      if (!this.users && this.users == undefined) {
        return []; // Return an empty array if users is null or undefined
      }
    
      const start = (this.currentPage - 1) * this.rowsPerPage;
      const end = start + this.rowsPerPage;
      if(this.users.results != undefined){
        return this.filteredUsers.slice(start, end);
      }
    },
    totalPages() {
      if (!this.users && this.users == undefined) {
        return 0; // Return 0 if users is null or undefined
      }
      return Math.ceil(this.users.count / this.rowsPerPage);
    },
    selectAll: {
      get: function () {
        return this.users ? this.selected.length == this.users.length : false;
      },
      set: function (value) {
        var selected = [];

        if (value) {
          this.users.results.forEach(function (user) {
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
    showM(user) {
      this.showModal = true;
      this.user = user;
    },
    cancelModal() {
      this.showModal = false;
    },
    cancelModal2() {
      this.showModal2 = false;
    },
  
    enableSearch() {
      this.searchMode = true;
    },
    disableSearch() {
      this.searchMode = false;
      this.searchTerm = "";
    },
    setCurrentPage(page) {
      this.currentPage = page;
    },
    changeRowsPerPage() {
      this.currentPage = 1; // reset to first page
    },
    sortBy: function (sortKey) {
      this.reverse = this.sortKey == sortKey ? !this.reverse : false;

      this.sortKey = sortKey;
    },
    isActive: function (column) {
      return this.sortKey == column;
    },
    search() {
      // implement search functionality here
    },
    add() {
      // implement add functionality here
    },
    download() {
      // implement download functionality here
    },
  },
};
</script>
