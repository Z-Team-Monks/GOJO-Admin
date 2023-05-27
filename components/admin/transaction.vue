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
            <div class="col-sm-7"><BarChart :chartData="chartData" /></div>
            <!-- <div class="col-sm-6"><LineChart :chartData="chartData" /></div> -->
            <div class="col-sm-5"><calender /></div>
          </div>
        </div>
        <div class="col-12 mt-5">
          <tabs class="nav-pills nav-fill" :data="tabsData"></tabs>
          <div class="tab-content p-3">
            <div class="tab-pane fade show active" id="all">
              <div v-if="loading">Loading...</div>
      <div v-else-if="transactions.length === 0">No transaction records</div>
              <Table :transaction="transaction" :columns="columns" />
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
import tabs from "../elements/tab.vue";
import Sidebar from "../elements/sidebar.vue";
import navbar from "../elements/navbar.vue";
import Calender from "../elements/calender.vue";
import Table from "../elements/transaction-table.vue";
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    card,
    BarChart,
    LineChart,
    tabs,
    Sidebar,
    navbar,
    Calender,
    Table,
  },
  name: "home",

  data() {
    return {
      columns: ["Name", "Home Status", "Location", "Payment Status", "Amount"],
      // transaction: [
      //   {
      //     id: "1",
      //     age: "21-12-2022",
      //     name: "Mira Herwitz...",
      //     homeStatus: "Rented",
      //     location: "Bole Bulbula",
      //     paymentStatus: "Approved",
      //     amount: "2000 ETB",
      //   },
      //   {
      //     id: "1",
      //     age: "21-12-2022",
      //     name: "Mira Herwitz...",
      //     homeStatus: "Rented",
      //     location: "Bole Bulbula",
      //     paymentStatus: "Approved",
      //     amount: "2000 ETB",
      //   },
      //   {
      //     id: "1",
      //     age: "21-12-2022",
      //     name: "Mira Herwitz...",
      //     homeStatus: "Rented",
      //     location: "Bole Bulbula",
      //     paymentStatus: "Rejected",
      //     amount: "2000 ETB",
      //   },
      //   {
      //     id: "1",
      //     age: "21-12-2022",
      //     name: "Mira Herwitz...",
      //     homeStatus: "Rented",
      //     location: "Bole Bulbula",
      //     paymentStatus: "Approved",
      //     amount: "2000 ETB",
      //   },
      // ],
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
    // Map the 'transactions' getter from the 'transaction' Vuex module
    ...mapGetters('transaction', ['transactions','loading']),
  },
  methods: {
    // Map the 'getTransactions' action from the 'transaction' Vuex module
    ...mapActions('transaction', ['getTransactions']),
  },
  created() {
    // Fetch transactions when the component is created
    this.getTransactions();
  },
};
</script>

<style lang="scss" scoped>
</style>