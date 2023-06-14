<template>
  <div class="dashboard">
    <navbar />
    <sidebar />
    <main class="s-layout__content">
      <div class="row ml-5 mr-5 mt-2">
        <div class="profile-card mb-3 col-12">
          <nav
            class="navbar navbar-light justify-content-between align-items-center"
          >
            <div>
              <Strong> <h4 class="mt-2">User Profile</h4></Strong>
            </div>
            <div>
              <i class="mdi mdi-account-edit" @click="showM(currentUser)"></i>

              <i
                class="mdi mdi-dots-vertical"
                style="font-size: 24px"
                @click="toggleDropdown"
              ></i>
            </div>
          </nav>
          <user-modal
            :show-modal="showModal"
            :modal-data="user"
            :create-user="false"
            @cancel="cancelModal"
            :cannotUpdateRole="true"
          ></user-modal>
          <div class="profile-content">
            <div class="row align-items-center">
              <div class="col-sm-3 text-center">
                <div v-if="isEditing" @click="onAvatarClick">
                  <input
                    type="file"
                    ref="avatarInput"
                    @change="onAvatarChange"
                    style="display: none"
                  />
                  <img
                    :src="currentUser1.profilePic"
                    class="rounded-circle"
                    style="width: 150px; height: 140px"
                    alt="Avatar"
                  />
                </div>
                <div v-else>
                  <img
                    :src="currentUser1.profilePic"
                    class="rounded-circle"
                    style="width: 150px; height: 140px"
                    alt="Avatar"
                  />
                </div>
                <div v-if="currentUser != undefined">
                  <h5 class="mt-4">
                    <strong
                      >{{ currentUser.first_name }}
                      {{ currentUser.last_name }}</strong
                    >
                  </h5>

                  <span v-if="currentUser.role == 1">Tenant</span>
                  <span v-else-if="currentUser.role == 2">Landlord</span>
                  <span v-else-if="currentUser.role == 3"
                    >Financial Manager</span
                  >
                  <span v-else-if="currentUser.role == 4">Listing Manager</span>
                  <span v-else>General Manager</span>
                </div>

                <div>
                  <b-button
                    v-b-modal.modal-1
                    class="btn-link custom-button"
                    variant="link"
                    ><i class="mdi mdi-account-key"></i> Change
                    Password</b-button
                  >

                  <b-modal
                    centered
                    id="modal-1"
                    title="Change Password"
                    hide-footer
                    button-size="sm"
                  >
                    <form
                      ref="form"
                      class="my-4"
                      @submit.stop.prevent="handleSubmit"
                    >
                      <b-form-group
                        :state="nameState"
                        invalid-feedback="Name is required"
                      >
                        <b-form-input
                          id="old-password-input"
                          placeholder="Old Password"
                          v-model="name"
                          :state="nameState"
                          required
                        ></b-form-input>
                      </b-form-group>
                      <b-form-group
                        :state="nameState"
                        invalid-feedback="Name is required"
                      >
                        <b-form-input
                          id="new-password-input"
                          placeholder="New Password"
                          v-model="name"
                          :state="nameState"
                          required
                        ></b-form-input>
                      </b-form-group>
                      <b-form-group
                        :state="nameState"
                        invalid-feedback="Name is required"
                      >
                        <b-form-input
                          id="confirm-password-input"
                          placeholder="Confirm Password"
                          v-model="name"
                          :state="nameState"
                          required
                        ></b-form-input>
                      </b-form-group>
                    </form>

                    <div class="row justify-content-end">
                      <div class="col-auto">
                        <b-button
                          variant="danger"
                          class="btn-labeled"
                          @click="$bvModal.hide('modal-1')"
                        >
                          <span class="btn-label"
                            ><i class="mdi mdi-close"></i></span
                          >Cancel
                        </b-button>
                      </div>
                      <div class="col-auto">
                        <b-button variant="success" class="btn-labeled">
                          <span class="btn-label"
                            ><i class="mdi mdi-check"></i></span
                          >Save
                        </b-button>
                      </div>
                    </div>
                  </b-modal>
                </div>
              </div>
              <div class="col-sm-9 p-3 border-left">
                <form class="p-2">
                  <div class="form-group row">
                    <div class="col-sm-6">
                      <div class="row">
                        <div class="col-6 mb-5 text-center">
                          <h6 class="form-control-plaintext">First name:</h6>
                        </div>
                        <div class="col-6 mb-5">
                          <input
                            v-if="currentUser != undefined"
                            class="form-control-plaintext"
                            :readonly="!isEditing"
                            :class="{
                              'readonly-field': !isEditing,
                              'editable-field': isEditing,
                            }"
                            style="font-weight: 700"
                            :value="currentUser.first_name"
                          />
                        </div>
                        <div class="col-6 mb-5 text-center">
                          <h6 class="form-control-plaintext">Last name:</h6>
                        </div>
                        <div class="col-6 mb-5">
                          <input
                            v-if="currentUser != undefined"
                            class="form-control-plaintext"
                            :readonly="!isEditing"
                            :class="{
                              'readonly-field': !isEditing,
                              'editable-field': isEditing,
                            }"
                            style="font-weight: 700"
                            :value="currentUser.last_name"
                          />
                        </div>
                        <div class="col-6 mb-5 text-center">
                          <h6 class="form-control-plaintext">Username:</h6>
                        </div>
                        <div class="col-6 mb-5">
                          <input
                            v-if="currentUser != undefined"
                            class="form-control-plaintext"
                            :readonly="!isEditing"
                            :class="{
                              'readonly-field': !isEditing,
                              'editable-field': isEditing,
                            }"
                            style="font-weight: 700"
                            :value="currentUser.first_name"
                          />
                        </div>
                        <div class="col-6 mb-5 text-center">
                          <h6 class="form-control-plaintext">Phone:</h6>
                        </div>
                        <div class="col-6 mb-5">
                          <input
                            v-if="currentUser != undefined"
                            class="form-control-plaintext"
                            :readonly="!isEditing"
                            :class="{
                              'readonly-field': !isEditing,
                              'editable-field': isEditing,
                            }"
                            style="font-weight: 700"
                            :value="currentUser.phone"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="row">
                        <div class="col-6 mb-5 text-center">
                          <h6 class="form-control-plaintext">Email:</h6>
                        </div>
                        <div class="col-6 mb-5">
                          <input
                            class="form-control-plaintext"
                            v-if="currentUser != undefined"
                            :readonly="!isEditing"
                            :class="{
                              'readonly-field': !isEditing,
                              'editable-field': isEditing,
                            }"
                            style="font-weight: 700"
                            value="johnDoe@example.com"
                          />
                        </div>
                        <div class="col-6 mb-5 text-center">
                          <h6 class="form-control-plaintext">Country:</h6>
                        </div>
                        <div class="col-6 mb-5">
                          <input
                            :readonly="!isEditing"
                            v-if="currentUser != undefined"
                            :class="{
                              'readonly-field': !isEditing,
                              'editable-field': isEditing,
                            }"
                            class="form-control-plaintext"
                            style="font-weight: 700"
                            value="Ethiopia"
                          />
                        </div>
                        <div class="col-6 mb-5 text-center">
                          <h6 class="form-control-plaintext">Status:</h6>
                        </div>
                        <div class="col-6 mb-5">
                          <input
                            :readonly="!isEditing"
                            v-if="currentUser != undefined"
                            :class="{
                              'readonly-field': !isEditing,
                              'editable-field': isEditing,
                            }"
                            class="form-control-plaintext"
                            style="font-weight: 700"
                            :value="currentUser.is_active"
                          />
                        </div>
                        <div class="col-6 text-center">
                          <h6 class="form-control-plaintext">Role:</h6>
                        </div>
                        <div class="col-6">
                          <input
                            :readonly="!isEditing"
                            v-if="currentUser != undefined"
                            :class="{
                              'readonly-field': !isEditing,
                              'editable-field': isEditing,
                            }"
                            class="form-control-plaintext"
                            style="font-weight: 700"
                            :value="currentUser.role"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="profile-footer w-100 pb-5 p-3 col-12">
          <div class="row ml-2 mr-2 mt-5">
            <div
              class="col-sm-4"
              v-for="content in cardContent"
              :key="content.id"
            >
              <card :content="content" />
            </div>
          </div>
        </div> -->
      </div>
    </main>
  </div>
</template>

<script>
import navbar from "../elements/navbar.vue";
import sidebar from "../elements/sidebar.vue";
import card from "../elements/card.vue";
import userModal from "../elements/user-modal.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "profile",
  components: { navbar, sidebar, card, userModal },
  data() {
    return {
      isEditing: false,
      dropdownOpen: false,
      showModal: false,
      name: "",
      user: [],
      nameState: true,
      currentUser1: {
        profilePic: "https://cdn-icons-png.flaticon.com/512/219/219988.png",
      },
      cardContent: [
        {
          id: "1",
          title: "End Users",
          icon: "mdi mdi-account-multiple-outline mdi-48px card-i",
          value: "92, 680",
          subscript: "+300 (26,80%)",
        },
        {
          id: "2",
          title: "Financial Managers",
          icon: "mdi mdi mdi-eye-outline mdi-48px card-i",
          value: "680",
          subscript: "+20 (16,20%)",
        },
        {
          id: "3",
          title: "Listing Managers",
          icon: "mdi mdi-chart-bar mdi-48px card-i",
          value: "380",
          subscript: "+24 (0.74%)",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("auth", ["currentUser", "getSuccess", "getError"]),
    isGeneralManager() {
      return this.currentUser.role == 4;
    },
  },
  methods: {
    // ...mapActions('auth', ['fetchCurrentUser']),
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    enableEdit() {
      this.isEditing = true;
    },
    onAvatarClick() {
      this.$refs.avatarInput.click();
    },
    onAvatarChange(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.currentUser.profilePic = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    showM(user) {
      this.showModal = true;
      this.user = user;
    },
    cancelModal() {
      this.showModal = false;
    },
  },
};
</script>
