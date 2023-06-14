<template>
  <div>
    <b-modal
      v-model="showModal"
      @hide="cancelModal"
      centered
      id="modal-2"
      :title="createUser == true ? 'Create User' : 'Edit User'"
      hide-footer
      button-size="sm"
    >
      <form ref="form" class="my-4">
        <b-form-group label="First Name" invalid-feedback="Name is required">
          <b-form-input
            id="old-password-input"
            placeholder="First Name"
            v-model="localModalData.first_name"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Last Name" invalid-feedback="Name is required">
          <b-form-input
            id="new-password-input"
            placeholder="Last Name"
            v-model="localModalData.last_name"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Phone" invalid-feedback="Name is required">
          <b-form-input
            id="confirm-password-input"
            placeholder="Phone"
            v-model="localModalData.phone"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          v-if="createUser == true"
          label="Password"
          invalid-feedback="Name is required"
        >
          <b-form-input
            id="confirm-password-input"
            placeholder="Password"
            v-model="localModalData.password"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          v-if="!cannotUpdateRole"
          label="Role"
          invalid-feedback="Name is required"
        >
          <b-form-select
            class="status-select"
            v-model="localModalData.role"
            :options="options0"
          ></b-form-select>
        </b-form-group>
        <b-form-group
          v-if="createUser == false"
          label="Status"
          invalid-feedback="Name is required"
        >
          <b-form-select
            class="status-select"
            v-model="localModalData.is_active"
            :options="options"
          ></b-form-select>
        </b-form-group>
      </form>

      <div class="row justify-content-end">
        <div class="col-auto">
          <b-button variant="danger" class="btn-labeled" @click="cancelModal">
            <span class="btn-label"><i class="mdi mdi-close"></i></span>Cancel
          </b-button>
        </div>
        <div class="col-auto">
          <b-button
            v-if="createUser == false"
            variant="success"
            @click="updateUser"
            class="btn-labeled"
          >
            <span class="btn-label"><i class="mdi mdi-check"></i></span>Save
          </b-button>
          <b-button
            v-else
            variant="success"
            @click="createUserMethod"
            class="btn-labeled"
          >
            <span class="btn-label"><i class="mdi mdi-check"></i></span>Create
          </b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
    modalData: {
      type: Object,
    },
    createUser: {
      type: Boolean,
    },
    cannotUpdateRole: {
      type: Boolean,
    },
  },
  data() {
    return {
      localShowModal: false,
      localModalData: {},
      nameState: true,
      name: "",
      options: [
        { value: true, text: "Activate" },
        { value: false, text: "Deactivate" },
      ],
      options0: [
        { value: 1, text: "Tenant" },
        { value: 2, text: "Landlord" },
        { value: 3, text: "Financial Manager" },
        { value: 4, text: "Listing Manager" },
        { value: 5, text: "General Manager" },
      ],
    };
  },
  watch: {
    showModal(value) {
      this.localShowModal = value;
    },
    loading(newValue) {
      this.$store.commit("auth/setUpdateLoading", newValue);
    },
    modalData: {
      handler(newValue) {
        this.localModalData = { ...newValue }; // Makes a local copy of the prop
      },
      immediate: true, // This ensures the handler is called right after the component is created
    },
  },
  computed: {
    ...mapGetters(["getUpdateError", "getUpdateSuccess"]),
    ...mapState("auth", {
      loading: (state) => state.updateLoading,
    }),
  },
  methods: {
    updateUser() {
      this.$store.dispatch("auth/updateUser", this.localModalData); // Use the local copy to update the user
      if (this.loading == true) {
        this.$emit("cancel");
      }
    },
    createUserMethod() {
      this.$store.dispatch("auth/createUser", this.localModalData); // Use the local copy to update the user
      this.$emit("cancel");
    },
    cancelModal() {
      this.$emit("cancel");
    },
    saveChanges() {
      // Save changes logic
      // ...
      this.$emit("save");
    },
  },
};
</script>
