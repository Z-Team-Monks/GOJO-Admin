<template>
    <div>
        <b-modal v-model="showDeleteModal" @hide="cancelDeleteModal" centered id="modal-delete" title="Change Status" hide-footer button-size="sm">
            <p>Are you sure you want to release this request?</p>
            <div class="row justify-content-end">
                <div class="col-auto">
                    <b-button variant="secondary" class="btn-labeled" @click="cancelDeleteModal">
                        <span class="btn-label"><i class="mdi mdi-close"></i></span>Cancel
                    </b-button>
                </div>
                <div class="col-auto">
                    <b-button variant="success" @click="approveTransaction" class="btn-labeled">
                        <span class="btn-label"><i class="mdi mdi-check"></i></span>Release
                    </b-button>
                </div>
                <!-- <div class="col-auto" v-if="action == 'decline'">
                    <b-button variant="danger" @click="declineTransaction" class="btn-labeled">
                        <span class="btn-label"><i class="mdi mdi-check"></i></span>Decline
                    </b-button>
                </div> -->
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
  computed: {
    ...mapGetters(['getDeleteError', 'getDeleteSuccess']),
  },
  methods: {
    ...mapActions('transaction', ['patchTransaction']),
    async approveTransaction() {
        try {
            await this.patchTransaction(this.localModalData); // assuming `id` is a property of `localModalData`
            this.$emit('cancel'); // close modal after successful deletion
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    },
    cancelDeleteModal() {
      this.$emit('cancel');
    },
  }
};
</script>
