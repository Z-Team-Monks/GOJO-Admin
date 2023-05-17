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
          <th><i class="mdi mdi-dots-vertical"></i></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction in transaction" :key="transaction.id">
          <td style="width: 3%">
            <input
              type="checkbox"
              v-model="selected"
              :value="transaction.id"
              number
            />
          </td>
          <td>
            <img
              src="https://cdn-icons-png.flaticon.com/512/219/219988.png"
              class="mr-2"
              width="40"
              alt=""
            />
            {{ transaction.name }}
          </td>
          <td>
            <span class="active-stat"
              ><i class="mdi mdi-circle"></i> {{ transaction.homeStatus }}</span
            >
          </td>
          <td>{{ transaction.location }}</td>
          <td v-if="transaction.paymentStatus == 'Approved'">
            <div class="active-stat text-center">
              {{ transaction.paymentStatus }}
            </div>
          </td>
          <td v-if="transaction.paymentStatus == 'Rejected'">
            <div class="deactive-stat text-center">
              {{ transaction.paymentStatus }}
            </div>
          </td>
          <td>
            {{ transaction.amount }}
          </td>
          <td><i class="mdi mdi-dots-vertical"></i></td>
        </tr>
      </tbody>
    </table>

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
export default {
  props: {
    transaction: {
      Type: Object,
    },
    columns: {
      Type: Object,
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
    };
  },
  computed: {
    pageDisplay() {
      const start = (this.currentPage - 1) * this.rowsPerPage + 1;
      const end = Math.min(
        this.currentPage * this.rowsPerPage,
        this.transaction.length
      );
      return `${start}-${end} of ${this.transaction.length}`;
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.rowsPerPage;
      const end = start + this.rowsPerPage;
      return this.transaction.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.transaction.length / this.rowsPerPage);
    },
    selectAll: {
      get: function () {
        return this.transaction
          ? this.selected.length == this.transaction.length
          : false;
      },
      set: function (value) {
        var selected = [];

        if (value) {
          this.transaction.forEach(function (user) {
            selected.push(user.id);
          });
        }

        this.selected = selected;
      },
    },
    orderedUsers: function () {
      return this.transaction, this.sortKey, this.reverse ? "asc" : "desc";
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
    