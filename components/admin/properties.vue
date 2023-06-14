<template>
    <div class="dashboard">
      <navbar />
      <sidebar />
      <main class="s-layout__content">
        <div class="row m-5">
          <!-- <tabs class="nav-pills nav-fill m-3" :data="tabsData0"></tabs> -->
          <div class="col-sm-4" v-for="content in cardContent" :key="content.id">
            <card :content="content" />
          </div>
  
          <div class="col-12 mt-5 mb-4">
            <h5>Properties</h5>
            <tabs class="nav-pills nav-fill" :data="tabsData"></tabs>
            <div class="tab-content">
              <div class="tab-pane fade show active" id="all">
                <Table :properties="properties" :columns="columns" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-8"><h5 >Categories</h5></div>
            <div class="col-sm-4"><b-button
                @click="showAddModal('addC')"
                variant="success"
                class="btn-labeled float-right"
              >
                <span class="btn-label"><i class="mdi mdi-plus"></i></span
                >Add Category
              </b-button></div>
          </div>
          <hr class="mt-3 mb-3">
          <add-modal
      :show-delete-modal="showModal"
      :modal-data="category"
      @cancel="cancelModal"
      :action="action"
    ></add-modal>
    <delete-confirmation
      :show-delete-modal="showModal1"
      :modal-data="category"
      @cancel="cancelModal1"
      :action="action1"
    ></delete-confirmation>
      <transition-group name="list" tag="div" class="row mb-4" v-if="categories != undefined">
        <div class="col-md-4" v-for="category in categories" :key="category.id">
          <div class="cat-card mb-4 mr-2 shadow-sm">
            <div class="card-body">
              <div class="row">
             <div class="col-8">
              <h5 class="card-title">{{ category.name }}</h5>
             </div>
              
            <div class="col-sm-2 edit-icon mr-1" @click="showAddModal(category, 'editC')">
              <i class="mdi mdi-account-edit"></i>
            </div>
              
            <div class="col-sm-2 delete-icon" @click="showAddModal1(category, 'deleteC')">
              <i class="mdi mdi-delete"></i>
            </div>
          </div>
            </div>
          </div>
        </div>
       
      </transition-group>
      
      <div class="row">
            <div class="col-sm-8"><h5 >Facilities</h5></div>
            <div class="col-sm-4"><b-button
                @click="showAddModal('addF')"
                variant="success"
                class="btn-labeled float-right"
              >
                <span class="btn-label"><i class="mdi mdi-plus"></i></span
                >Add Facility
              </b-button></div>
          </div>
      <hr class="mt-3 mb-3">
      <transition-group name="list" tag="div" class="row" v-if="facilities != undefined">
        <div class="col-md-4" v-for="facility in facilities" :key="facility.id">
          <div class="cat-card mb-4 mr-2 shadow-sm">
            <div class="card-body">
              <div class="row">
             <div class="col-8">
              <h5 class="card-title">{{ facility.name }}</h5>
             </div>
              
            <div class="col-sm-2 edit-icon mr-1" @click="showAddModal(facility, 'editF')">
              <i class="mdi mdi-account-edit"></i>
            </div>
              
            <div class="col-sm-2 delete-icon" @click="showAddModal1(facility, 'deleteF')">
              <i class="mdi mdi-delete"></i>
            </div>
          </div>
            </div>
          </div>
        </div>
      </transition-group>
    
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
import AddModal from '../elements/add-modal.vue';

import addModal from '../elements/add-modal.vue'
import DeleteConfirmation from '../elements/delete-confirmation.vue';
  
  export default {
    components: {
      card,
     
      tabs,
      Sidebar,
      navbar,
     addModal,
      Table,
        AddModal,
        DeleteConfirmation,
    },
    name: "home",
  
    data() {
      return {
        action:'',
        action1:'',
        category:[],
        columns: ["Owner","Title","Category", "Location", "Amount", "Rating", "Status", "Action", "VR"],
        // categories: [{'name': 'Appartment', 'id':1}, {'name': 'Condomineum', 'id':2}, {'name': 'Guest House', 'id':3}],

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
        tabsData0: [
          {
            id: "properties",
            title: "Properties",
            active: true,
          },
          {
            id: "categories",
            title: "Categories",
          },
          {
            id: "facilities",
            title: "Facilities",
          },
        ],
        showModal: false,
        
        showModal1: false
      };
    },
    computed: {
    // Map the 'properties' getter from the 'properties' Vuex module
    ...mapGetters('properties', ['properties', 'loading', 'categories', 'facilities']),

  },

  methods: {
    // Map the 'fetchProperties' action from the 'properties' Vuex module
    ...mapActions('properties', ['fetchProperties', 'fetchCategories', 'fetchFacilities']),
    editCategory(id) {
      // your edit logic here
    },
    deleteCategory(id) {
      // your delete logic here
    },
    showAddModal(cate, action) {
      this.showModal = true,
      this.action = action, 
      this.category = cate
    },
    showAddModal1(cate, action) {
      this.showModal1 = true,
      this.action1 = action,
      this.category = cate
    },
    cancelModal(){
      this.showModal = false
    },
    cancelModal1(){
      this.showModal1 = false
    }
  },

  created() {
    // Fetch properties when the component is created
    this.fetchProperties();
    this.fetchCategories();
    this.fetchFacilities();
  },
  };
  </script>
  
  <style lang="scss" scoped>
  /* Define the transitions */
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.cat-card{
  background-color: white;
  padding: 1.5rem;
  border-radius: .5rem;
}
.btn-label{
  left: -1px;
}
.btn-labeled{
  padding-right: 5px;
}
  </style>