<template>
  <div class="dashboard">
    <navbar />
    <sidebar />
    <main class="s-layout__content">
      <div class="row m-5">
        <div class="col-sm-4" v-for="content in cardContent" :key="content.id">
          <card :content="content" :report="getReports" />
        </div>

        <div class="col-12 mt-5">
          <div class="row">
            <div class="col-sm-6"><BarChart :options="options" :chartData="chartData" /></div>
            <div class="col-sm-6"><LineChart :options="options" :chartData="chartData" /></div>
            <!-- <div class="col-sm-5"><calender /></div> -->
          </div>
        </div>
        <div class="col-12 mt-5">
          <tabs class="nav-pills nav-fill" :data="tabsData"></tabs>
          <div class="tab-content p-3">
            <div class="tab-pane fade show active" id="all">
              <div v-if="loading">Loading...</div>
              
            
              <div v-else-if="getTransactions.results.length === 0">
                No transaction records
              </div>
              <Table
                v-else
                :transactions="getTransactions"
                :columns="columns"
              />
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
import { mapActions, mapGetters } from "vuex";

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
      columns: [
        "Property",
        "Payment Date",
        "Amount",
        "Payment Status",
        "Action",
      ],
      cardContent: [
        {
          id: "cash_flow",
          title: "Total Cash Flow",
          icon: "mdi mdi-account-multiple-outline mdi-48px card-i",
          page: "transaction",
          subscript: "+3,840 ETB (26,80%)",
        },
        {
          id: "current_balance",
          title: "Current Amount",
          icon: "mdi mdi mdi-eye-outline mdi-48px card-i",
          page: "transaction",
          subscript: "+210K (16,20%)",
        },
        {
          id: "released_amount",
          title: "Released Amount",
          icon: "mdi mdi-chart-bar mdi-48px card-i",
          page: "transaction",
          subscript: "-2400 ETB (0.74%)",
        },
      ],
      tabsData: [
        {
          id: "all",
          title: "Withdraw Requests",
          active: true,
        },
      ],
      chartData: {
        labels: [
          "Total Cash Flow",
          "Current Balance",
          "Released",
          "Approved",
          "Pending",
        ],
        datasets: [
          {
            label: "Transaction Report",
            fill: false,
            data: [],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
              "rgb(54, 162, 35)",
              "rgb(255, 205, 186)",
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    };
  },
  computed: {
    // Map the 'transactions' getter from the 'transaction' Vuex module
    ...mapGetters("transaction", ["getTransactions", "loading", "getReports"]),
  },
  methods: {
    // Map the 'getTransactions' action from the 'transaction' Vuex module
    ...mapActions("transaction", [
      "fetchTransactions",
      "fetchTransactionsReport",
    ]),
    updateChart() {
      this.chartData.datasets[0].data = Object.values(this.getReports);
    },
  },
  created() {
    // Fetch transactions when the component is created
    this.fetchTransactions();
    this.fetchTransactionsReport();
    this.updateChart();
  },
};
</script>

<style lang="scss" scoped></style>
