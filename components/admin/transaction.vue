<template>
    <div class="dashboard">
      <nav class="navbar navbar-light bg-light sticky-top  justify-content-end">
  <a class="navbar-brand text-right" href="#">
    Natnael Abay <img src="../../assets/images/user.png" width="30" height="30" alt="">
  </a>
</nav>
<div class="s-layout__sidebar">
  <a class="s-sidebar__trigger" href="#0">
     <i class="fa fa-bars"></i>
  </a>

  <nav class="s-sidebar__nav mt-5">
     <ul>
        <li>
           <a class="s-sidebar__nav-link" href="#0">
             <img src="../../assets/images/home.png" width="30" height="30" alt="">
           </a>
        </li>
        <li>
           <a class="s-sidebar__nav-link" href="#0">
            <img src="../../assets/images/user.png" width="30" height="30" alt="">
           </a>
        </li>
        <li>
           <a class="s-sidebar__nav-link" href="#0">
            <img src="../../assets/images/settings.png" width="30" height="30" alt="">
           </a>
        </li>
     </ul>
  </nav>
</div>
       <main class="s-layout__content">
        <div class="row m-5">
            <div class="col-sm-4">
                <card />
            </div>
            <div class="col-sm-4">
                <card />
            </div>
            <div class="col-sm-4">
                <card />
            </div>
            
            <div class="col-12 mt-5">
                <div class="row">
        <div class="col-sm-6"><BarChart :chartData="chartData" /></div>
        <div class="col-sm-6"> <line-chart :chartData="chartData"/></div>
       </div>
            </div>
            <div class="col-12 mt-5 pt-5">
                <h4>Users</h4>
      <table classs="table">
        <thead>
          <tr>
            <th align="left" >
              <input type="checkbox" v-model="selectAll">
            </th>
            <th v-for="column in columns" :key="column">
                <a href="#" @click.prevent=sortBy(column) :class="{ active : isActive(column) }">
                  {{ column | capitalize }}
                </a>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td style="width: 3%"><input type="checkbox" v-model="selected" :value="user.id" number></td>
            <td> <i class="mdi mdi-account-circle-outline mdi-24px"></i> {{ user.name | capitalize }}</td>
            <td><strong>{{ user.email }}</strong> <br><span class="dept-span">{{ user.email }}</span> </td>
            <td>{{ user.age }}</td>
            <td v-if="user.status == 'Active'"><span class="active-stat">{{ user.status }}</span></td>
            <td v-if="user.status == 'Deactive'"><span class="deactive-stat">{{ user.status }}</span></td>
          </tr>
        </tbody>
        <nav aria-label="Page navigation nav-style">
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
      </table>
     
      
            </div>
        </div>
        
       </main>
       
    </div>
</template>

<script>
import card from '../elements/card.vue'
import BarChart from '../statistics/BarChart.vue'
import LineChart from '../statistics/LineChart.vue'


export default {
  components: { card, BarChart, LineChart},
    name:'home',
   
    data() {
    return{
        sortKey: "",
    reverse: false,
  
    search: "",
    selected: [],
    columns: ["Name", "Department", "last active date", "status"],
    users: [ 
      { "id": "1", "age" : '21-12-2022', "name": "Shad Jast Bahil...", "email": "Software and Information Technology", "status": "Active", },
      { "id": "2", "age" : '21-12-2022', "name": "Duane Metz Aerz...", "email": "Software and Information Technology", "status": "Deactive", }, 
      { "id": "3", "age" : '21-12-2022', "name": "Myah Kris Brown...", "email": "Software and Information Technology", "status": "Active", }, 
      { "id": "4", "age" : '21-12-2022', "name": "Dr. Kamron Wunsch", "email": "Software and Information Technology", "status": "Deactive", },
      { "id": "5", "age" : '21-12-2022', "name": "David Pella Der....", "email": "Software and Information Technology", "status": "Active", },
      { "id": "6", "age" : '21-12-2022', "name": "Richard Jacob Yakor...", "email": "Software and Information Technology", "status": "Deactive", }
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
              150,
              200,
              100,
              50,
              500,
              130,
              700,
              240,
              900,
              560,
              350,
              420,
              100
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
    }
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
      }
    },
    orderedUsers: function(){
      return this.users, this.sortKey, this.reverse ? "asc" : "desc";
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  methods: {
    sortBy: function(sortKey){
      
      this.reverse = (this.sortKey == sortKey) ? ! this.reverse : false;

      this.sortKey = sortKey;
    },
    isActive: function(column){
      return this.sortKey == column;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>