<template>
    <div>
      <b-modal v-model="showDeleteModal" @hide="cancelDeleteModal" centered id="modal-delete" title="Change Status" hide-footer button-size="sm">
        <p>Are you sure you want to delete this item?</p>
        <div class="row justify-content-end">
          <div class="col-auto">
            <b-button variant="secondary" class="btn-labeled" @click="cancelDeleteModal">
              <span class="btn-label"><i class="mdi mdi-close"></i></span>Cancel
            </b-button>
          </div>
          <div class="col-auto" v-if="action == 'deleteC'">
            <b-button variant="danger" @click="deleteCategoryAndCloseModal" class="btn-labeled">
              <span class="btn-label"><i v-if="loadd == false" class="mdi mdi-check"></i><i v-if="loadd == true" class="mdi mdi-loading mdi-spin mdi-18px"></i></span>Delete
            </b-button>
          </div>
          <div class="col-auto" v-if="action == 'deleteF'">
            <b-button variant="danger" @click="deleteFacilityAndCloseModal" class="btn-labeled">
              <span class="btn-label"><i v-if="loadd == false" class="mdi mdi-check"></i><i v-if="loadd == true" class="mdi mdi-loading mdi-spin mdi-18px"></i></span>Delete
            </b-button>
          </div>
        </div>
      </b-modal>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    props: {
      showDeleteModal: {
        type: Boolean,
        required: true
      },
      modalData: {
        type: Object
      },
      action:{
        type: String
      }
    },
    data() {
      return {
        localShowDeleteModal: false,
        localModalData: {},
        loadd:false,
      };
    },
    watch: {
      showDeleteModal(value) {
        this.localShowDeleteModal = value;
      },
      modalData: {
        handler(newValue) {
          this.localModalData = {...newValue}; // Makes a local copy of the prop
        },
        immediate: true, // This ensures the handler is called right after the component is created
      },
    },
    methods: {
      ...mapActions('properties', ['deleteCategory', 'deleteFacility']),
      async deleteCategoryAndCloseModal() {
        this.loadd = true
        try {
          await this.deleteCategory(this.localModalData.id);
          this.$emit('cancel'); // close modal after successful deletion
        } catch (error) {
            this.loadd = false
          console.error("Error deleting category:", error);
        }
      },
      async deleteFacilityAndCloseModal() {
        this.loadd = true
        try {
          await this.deleteFacility(this.localModalData.id);
          this.loadd = false
          this.$emit('cancel'); // close modal after successful deletion
        } catch (error) {
          console.error("Error deleting facility:", error);
        }
      },
      cancelDeleteModal() {
        this.$emit('cancel');
      },
    }
  };
  </script>
  