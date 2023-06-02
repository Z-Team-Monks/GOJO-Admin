<template>
    <div>
      <table classs="table">
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
          <tr v-for="property in properties.results" :key="property.id">
            <td style="width: 3%">
              <input
                type="checkbox"
                v-model="selected"
                :value="property.id"
                number
              />
            </td>
            <td>
              <!-- <img
                src="https://cdn-icons-png.flaticon.com/512/219/219988.png"
                class="mr-2"
                width="40"
                alt=""
              /> -->
              {{ property.owner.first_name }} {{ property.owner.last_name[0] }}.
            </td>
            <td>
              {{ property.title }}
            </td>
            <td>{{ property.category }}</td>
            <!-- <td>
            <div v-for="facility in properties.facilities" :key="facility.name">
                {{ facility.name }}: {{ facility.count }}
            </div>
            
            </td> -->
            
            <td v-if="property.location">{{ property.location.street }}</td>
            <td v-else>Not set</td>
            <!-- <td>
                <span v-if="properties.visiting_hours.length != 0">Yes</span>
                <span v-else>No</span>
            </td> -->
            <td>
              {{ property.amount }}
            </td>
            <td>
                <span class="active-stat"
                ><i class="mdi mdi-star"></i> {{ property.rating }}</span
              >
            </td>
            <td v-if="property.is_approved == true">
              <div class="active-stat text-center">
                Approved
              </div>
            </td>
            <td v-if="property.is_approved == false">
              <div class="deactive-stat text-center">
                Rejected
              </div>
            </td>
            
            <td>
              <button class="btn btn-link" @click="showM(property)"><i class="mdi mdi-dots-vertical"></i></button>
            </td>
            <td>
              <button class="btn btn-text" @click="vr(property.id)">Create VR</button>
            </td>
          </tr>
        </tbody>
      </table>
      <properties-modal
      :show-modal="showModal"
      :modal-data="property"
      @cancel="cancelModal"
    ></properties-modal>
      <nav aria-label="Page navigation nav-style" class="pagination-wrapper">
        <ul class="pagination">
          <li
            class="page-item"
            :class="{ disabled: currentPage === 1 }"
            @click="currentPage > 1 && setCurrentPage(currentPage - 1)"
          >
            <a class="page-link" href="#" aria-label="Previous">
              <i class="mdi mdi-chevron-left"></i>
              <span class="sr-only">Previous</span>
            </a>
          </li>
          <li
            class="page-item"
            :class="{ disabled: currentPage === totalPages }"
            @click="currentPage < totalPages && setCurrentPage(currentPage + 1)"
          >
            <a class="page-link" href="#" aria-label="Next">
              <i class="mdi mdi-chevron-right"></i>
  
              <span class="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
      <div class="pagination-wrapper">
        <label for="rowsPerPage">Rows per page: </label>
        <select
          class="rows-per-page"
          v-model="rowsPerPage"
          @change="changeRowsPerPage"
        >
          <option
            v-for="option in [5, 10, 20, 50, 100]"
            :key="option"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
        <span class="pl-2 pr-2">{{ pageDisplay }}</span>
      </div>
    </div>
  </template>
      
      <script>
import propertiesModal from '../elements/properties-modal.vue';
  export default {
  components: { propertiesModal },
    props: {
      properties: {
        Type: Array,
      },
      columns: {
        Type: Array,
      },
    },
    data() {
      return {
        sortKey: "",
        reverse: false,
        currentPage: 1,
        rowsPerPage: 10,
        search: "",
        selected: [],
        showModal:false,
        property:[]
      };
    },
    computed: {
      pageDisplay() {
        const start = (this.currentPage - 1) * this.rowsPerPage + 1;
        const end = Math.min(
          this.currentPage * this.rowsPerPage,
          this.properties.count
        );
        return `${start}-${end} of ${this.properties.count}`;
      },
      paginatedUsers() {
        const start = (this.currentPage - 1) * this.rowsPerPage;
        const end = start + this.rowsPerPage;
        return this.properties.results.slice(start, end);
      },
      totalPages() {
        return Math.ceil(this.properties.count / this.rowsPerPage);
      },
      selectAll: {
        get: function () {
          return this.properties
            ? this.selected.length == this.properties.count
            : false;
        },
        set: function (value) {
          var selected = [];
  
          if (value) {
            this.properties.results.forEach(function (user) {
              selected.push(user.id);
            });
          }
  
          this.selected = selected;
        },
      },
      orderedUsers: function () {
        return this.properties, this.sortKey, this.reverse ? "asc" : "desc";
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
      vr(id){
        this.$router.push({path:'/tour/create/', params: { id: id }})
      },
      showM(properties) {
        this.showModal = true
        this.property = properties
    },
    cancelModal(){
      this.showModal = false
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
    },
  };
  </script>
      