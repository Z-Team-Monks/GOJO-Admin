<template>
  <div>
    <table classs="table" v-if="Object.keys(transactions).length !== 0">
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
      <!-- {{ transactions.results }} -->
      <tbody>
        <tr v-for="transaction in localTransactions.results" :key="transaction.id">
          <td style="width: 3%">
            <input
              type="checkbox"
              v-model="selected"
              :value="transaction.id"
              number
            />
          </td>
          <td>
            
            {{ transaction.property_title }}
          </td>
          
          <td>{{ transaction.payment_date }}</td>
          <td>
            {{ transaction.amount }}
          </td>
          <td>
           
             {{ transaction.status}}
           
          </td>
          <td>
            <!-- <div class="row justify-content-end">
          <div class="col-auto">
            <b-button variant="danger" class="btn-labeled">
              <span class="btn-label"><i class="mdi mdi-close"></i></span>Decline
            </b-button>
          </div>
          <div class="col-auto">
            <b-button variant="success" class="btn-labeled">
              <span class="btn-label"><i class="mdi mdi-check"></i></span>Approve
            </b-button>
          </div>
        </div> -->
        <b-form-select v-model="selectedOption" @change="onChange(transaction)">
      <b-form-select-option :value="null">Please select...</b-form-select-option>
      <b-form-select-option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.text }}
      </b-form-select-option>
    </b-form-select>
          </td>
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
          :title="option.stat"
        >
          {{ option }}
        </option>
      </select>
      <span class="pl-2 pr-2">{{ pageDisplay }}</span>
    </div>
  </div>
</template>
    
    <script>
    import { mapActions } from 'vuex';
export default {
  props: {
    transactions: {
      Type: Array,
      default: () => [],
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
      selectedOption:'',
      status:1,
      search: "",
      selected: [],
      localTransactions: this.transactions,
      options: [
        { value: 1, text: 'Withdraw Pending' },
        { value: 3, text: 'Approved' },
        { value: 2, text: 'Declined' }
      ]
    };
  },
  // watch: {
  //   transactions: {
  //     handler(newValue) {
  //       this.localTransactions = newValue
  //     },
  //     immediate: true,
  //   },
  // },
  computed: {
    pageDisplay() {
      const start = (this.currentPage - 1) * this.rowsPerPage + 1;
      const end = Math.min(
        this.currentPage * this.rowsPerPage,
        this.transactions.count
      );
      return `${start}-${end} of ${this.transactions.count}`;
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.rowsPerPage;
      const end = start + this.rowsPerPage;
      return this.transactions.results.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.transactions.count / this.rowsPerPage);
    },
    selectAll: {
      get: function () {
        return this.transactions
          ? this.selected.length == this.transactions.count
          : false;
      },
      set: function (value) {
        var selected = [];

        if (value) {
          this.transactions.forEach(function (user) {
            selected.push(user.id);
          });
        }

        this.selected = selected;
      },
    },
    orderedUsers: function () {
      return this.transactions, this.sortKey, this.reverse ? "asc" : "desc";
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
    ...mapActions('transaction', ['patchTransaction']),

    onChange(transaction) {
      this.patchTransaction({ id: transaction.id, transactionData: { status: this.selectedOption } });
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
    