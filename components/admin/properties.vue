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
                <Table :properties="properties" :columns="columns" />
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
  import Sidebar from "../elements/sidebar.vue";
  import navbar from "../elements/navbar.vue";
 
  import Table from "../elements/properties-table.vue";
  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    components: {
      card,
     
      tabs,
      Sidebar,
      navbar,
     
      Table,
    },
    name: "home",
  
    data() {
      return {
        columns: ["Owner","Title","Category", "Location", "Amount", "Rating", "Status", "Action", "VR"],

        cardContent: [
          {
            id: "1",
            title: "Total Properties",
            icon: "mdi mdi-account-multiple-outline mdi-48px card-i",
            value: "93230",
            subscript: "+3,840 (26,80%)",
          },
          {
            id: "2",
            title: "Approved Properties",
            icon: "mdi mdi mdi-eye-outline mdi-48px card-i",
            value: "58000",
            subscript: "+210K (16,20%)",
          },
          {
            id: "3",
            title: "Rejected Properties",
            icon: "mdi mdi-chart-bar mdi-48px card-i",
            value: "12232",
            subscript: "-2400 (0.74%)",
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
        
      };
    },
    computed: {
    // Map the 'properties' getter from the 'properties' Vuex module
    ...mapGetters('properties', ['properties', 'loading']),
  },

  methods: {
    // Map the 'fetchProperties' action from the 'properties' Vuex module
    ...mapActions('properties', ['fetchProperties']),
  },

  created() {
    // Fetch properties when the component is created
    this.fetchProperties();
  },
  };
  </script>
  
  <style lang="scss" scoped>
  </style>