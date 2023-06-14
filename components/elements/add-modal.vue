<template>
    <div>
        <b-modal v-model="showDeleteModal" @hide="cancelDeleteModal" centered id="modal-delete" title="Add" hide-footer button-size="sm">
            
            <form ref="form" class="my-2">
        <b-form-group v-if="modalData == 'addC' || action =='editC'" label="Category Name" invalid-feedback="Name is required">
          <b-form-input
            id="cat-name"
            placeholder="Category Name"
            v-model="localModalData.name"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group v-if="modalData == 'addF' || action == 'editF'" label="Facility Name" invalid-feedback="Name is required">
          <b-form-input
            id="cat-name"
            placeholder="Facility Name"
            v-model="localModalData.name"
            required
          ></b-form-input>
        </b-form-group>
      </form>
            <div class="row justify-content-end">
                <div class="col-auto">
                    <b-button variant="secondary" class="btn-labeled" @click="cancelDeleteModal">
                        <span class="btn-label"><i class="mdi mdi-close"></i></span>Cancel
                    </b-button>
                </div>
                <div class="col-auto" v-if="modalData == 'addC'">
                    <b-button variant="success" @click="addCategoryAndCloseModal" class="btn-labeled">
                        <span class="btn-label"><i v-if="loadd == false" class="mdi mdi-check"></i><i v-if="loadd == true" class="mdi mdi-loading mdi-spin mdi-18px"></i></span>Add
                    </b-button>
                </div>
                
                <div class="col-auto" v-if="action == 'editC'">
                    <b-button variant="success" @click="editCategoryAndCloseModal" class="btn-labeled">
                        <span class="btn-label"><i v-if="loadd == false" class="mdi mdi-check"></i><i v-if="loadd == true" class="mdi mdi-loading mdi-spin mdi-18px"></i></span>Save
                    </b-button>
                </div>
                <div class="col-auto" v-if="action == 'editF'">
                    <b-button variant="success" @click="editFacilityAndCloseModal" class="btn-labeled">
                        <span class="btn-label"><i v-if="loadd == false" class="mdi mdi-check"></i><i v-if="loadd == true" class="mdi mdi-loading mdi-spin mdi-18px"></i></span>Save
                    </b-button>
                </div>
                <div class="col-auto" v-if="modalData == 'addF'">
                    <b-button variant="success" @click="addFacilityAndCloseModal" class="btn-labeled">
                        <span class="btn-label"><i v-if="loadd == false" class="mdi mdi-check"></i><i v-if="loadd == true" class="mdi mdi-loading mdi-spin mdi-18px"></i></span>Add
                    </b-button>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
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
      catName:'',
      loadd: false,
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
//   computed: {
//     ...mapGetters(['getDeleteError', 'getDeleteSuccess']),
//   },
  methods: {
    ...mapActions('properties', ['addCategory', 'updateCategory', 'addFacility', 'updateFacility']),
    async addCategoryAndCloseModal() { // new method to add category
        this.loadd = true
      try {
        const newCategory = {
          name: this.localModalData.name
          // add more properties if necessary
        };
        await this.addCategory(newCategory); 
        this.loadd = false
        this.$emit('cancel'); // close modal after successful addition
      } catch (error) {
        console.error("Error adding category:", error);
      }
    },
    async editCategoryAndCloseModal(){
        this.loadd = true
        try {
        const newCategory = {
          name: this.localModalData
          // add more properties if necessary
        };
        await this.updateCategory(newCategory); 
        this.loadd = false
        this.$emit('cancel'); // close modal after successful addition
      } catch (error) {
        console.error("Error editing category:", error);
      }
    },
    async addFacilityAndCloseModal() { // new method to add category
        this.loadd = true
      try {
        const newCategory = {
          name: this.localModalData.name
          // add more properties if necessary
        };
        await this.addFacility(newCategory); 
        this.loadd = false
        this.$emit('cancel'); // close modal after successful addition
      } catch (error) {
        console.error("Error adding category:", error);
      }
    },
    async editFacilityAndCloseModal(){
        this.loadd = true
        try {
        const newCategory = {
          name: this.localModalData
          // add more properties if necessary
        };
        await this.updateFacility(newCategory); 
        this.loadd = false
        this.$emit('cancel'); // close modal after successful addition
      } catch (error) {
        console.error("Error editing category:", error);
      }
    },
    cancelDeleteModal() {
      this.$emit('cancel');
    },
  }
};
</script>
