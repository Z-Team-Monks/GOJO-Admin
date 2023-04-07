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
                  <div class="col-10">
                    <h4>Users</h4>
                  </div>
                  <div class="col-2">
                    <button class="round" @click="addUser"><i class="mdi mdi-plus mdi-24px"></i> Add User</button>
                    <div class="modal fade" id="form" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header border-bottom-0">
        <h5 class="modal-title" id="exampleModalLabel">Create Account</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form>
        <div class="modal-body">
          <div class="form-group">
            <label for="email1">Email address</label>
            <input type="email" class="form-control" id="email1" aria-describedby="emailHelp" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">Your information is safe with us.</small>
          </div>
          <div class="form-group">
            <label for="password1">Password</label>
            <input type="password" class="form-control" id="password1" placeholder="Password">
          </div>
          <div class="form-group">
            <label for="password1">Confirm Password</label>
            <input type="password" class="form-control" id="password2" placeholder="Confirm Password">
          </div>
        </div>
        <div class="modal-footer border-top-0 d-flex justify-content-center">
          <button type="submit" class="btn btn-success">Submit</button>
        </div>
      </form>
    </div>
  </div>
</div>
                  </div>
                </div>
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

export default {
  components: { card},
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