<template>
  <div class="dashboard">
    <navbar />
    <sidebar />
    <main class="s-layout__content">
      <div class="row m-5">
        <div class="col-sm-4" v-for="content in cardContent" :key="content.id" >
          <card :content="content"/>
        </div>

        <div class="col-12 mt-5">
          <div class="row">
            <div class="col-sm-7"><BarChart :chartData="chartData" /></div>
            <!-- <div class="col-sm-6"><LineChart :chartData="chartData" /></div> -->
            <div class="col-sm-5"> <calender /> </div>
          </div>
        </div>
        <div class="col-12 mt-5">
         
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
                  <img src="https://cdn-icons-png.flaticon.com/512/219/219988.png" class="mr-2" width="40" alt="">
                  {{ transaction.name }}
                </td>
                <td>
                  <span class="active-stat"><i class="mdi mdi-circle"></i> {{ transaction.homeStatus }}</span>
                 
                </td>
                <td>{{ transaction.location }}</td>
                <td v-if="transaction.paymentStatus == 'Approved'">
                  <div class="active-stat text-center">{{ transaction.paymentStatus }}</div>
                </td>
                <td v-if="transaction.paymentStatus == 'Rejected'">
                  <div class="deactive-stat text-center">{{ transaction.paymentStatus }}</div>
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
import BarChart from "../statistics/BarChart.vue";
import LineChart from "../statistics/LineChart.vue";
import tabs from "../elements/tab.vue"
import Sidebar from '../elements/sidebar.vue';
import navbar from "../elements/navbar.vue"
import Calender from '../elements/calender.vue';
export default {
  components: { card, BarChart, LineChart, tabs, Sidebar, navbar, Calender },
  name: "home",

  data() {
    return {
      sortKey: "",
      reverse: false,

      search: "",
      selected: [],
      columns: ["Name", "Home Status","Location", "Payment Status", "Amount"],
      transaction: [
        {
          id: "1",
          age: "21-12-2022",
          name: "Mira Herwitz...",
          homeStatus: "Rented",
          location: "Bole Bulbula",
          paymentStatus:"Approved",
          amount:"2000 ETB"
        },
        {
          id: "1",
          age: "21-12-2022",
          name: "Mira Herwitz...",
          homeStatus: "Rented",
          location: "Bole Bulbula",
          paymentStatus:"Approved",
          amount:"2000 ETB"
        },
        {
          id: "1",
          age: "21-12-2022",
          name: "Mira Herwitz...",
          homeStatus: "Rented",
          location: "Bole Bulbula",
          paymentStatus:"Rejected",
          amount:"2000 ETB"
        },
        {
          id: "1",
          age: "21-12-2022",
          name: "Mira Herwitz...",
          homeStatus: "Rented",
          location: "Bole Bulbula",
          paymentStatus:"Approved",
          amount:"2000 ETB"
        },
        
      ],
      cardContent: [
        {
          id: "1",
          title: "Total Cash Flow",
          icon: "mdi mdi-account-multiple-outline mdi-48px card-i",
          value: "9.2K ETB",
          subscript: "+3,840 ETB (26,80%)",
        },
        {
          id: "2",
          title: "Current Amount",
          icon: "mdi mdi mdi-eye-outline mdi-48px card-i",
          value: "58K ETB",
          subscript: "+210K (16,20%)",
        },
        {
          id: "3",
          title: "Released",
          icon: "mdi mdi-chart-bar mdi-48px card-i",
          value: "12K ETB",
          subscript: "-2400 ETB (0.74%)",
        },
      ],
      tabsData: [
        {
          id: "all",
          title: "All",
          active: true,
        },
        {
          id: "approved",
          title: "Approved",
        },
        {
          id: "rejected",
          title: "Rejected",
        },
      ],
      chartData: {
        labels: [
          "2019-06",
          "2019-07",
          "2019-08",
          "2019-09",
          "2019-10",
          "2019-11",
          "2019-12",
          "2020-01",
          "2020-02",
          "2020-03",
          "2020-04",
          "2020-05",
          "2020-06",
        ],
        datasets: [
          {
            label: "Transaction History",
            fill: false,
            data: [
              150, 200, 100, 50, 500, 130, 700, 240, 900, 560, 350, 420, 100,
            ],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
              "rgb(255, 25, 16)",
              "rgb(55, 125, 160)",
              "rgb(205, 125, 16)",
              "rgb(205, 125, 160)",
              "rgb(105, 15, 16)",
              "rgb(25, 105, 16)",
              "rgb(154, 12, 235)",
              "rgb(14, 162, 125)",
              "rgb(4, 62, 25)",
            ],
            hoverOffset: 4,
          },
        ],
      },
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