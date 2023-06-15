<template>
  <div>
    <b-modal
      v-model="showModal"
      @hide="cancelModal"
      centered
      id="modal-2"
      :title="modalData.title"
      scrollable
      button-size="sm"
      size="xl"
    >
      <template #modal-header="{}">
        <h4>{{ modalData.category }}: {{ modalData.title }}</h4>
        <div class="d-flex align-items-center">
          <div>
            <b-form-select
              v-model="selectedOption"
              :options="optionsStatus"
            ></b-form-select>
          </div>
          <div>
            <b-button
              @click="updateStatus"
              variant="success"
              class="btn-labeled"
              >Apply</b-button
            >
          </div>
        </div>
      </template>
      <div class="row">
        <div class="col-sm-6">
          <div class="image-container">
            <div class="image-display">
              <div class="featured-image">
                <div v-if="!featuredImage">No Image for this property</div>
                <img
                  v-if="featuredImage"
                  :src="featuredImage"
                  alt="Featured Image"
                />
              </div>
              <div class="thumbnail-images">
                <div
                  class="thumbnail"
                  v-for="(image, index) in modalData.images"
                  :key="index"
                  @click="setFeaturedImage(image)"
                >
                  <img :src="image" alt="Thumbnail Image" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <i class="mdi mdi-shower"></i>
            <span v-for="facility in modalData.facilities" :key="facility.id">
              {{ facility.amount }} {{ facility.name }},
            </span>
          </div>
          <div v-if="modalData.location != undefined">
            <strong><i class="mdi mdi-map-marker-outline"></i></strong>
            {{ modalData.location.street }}
          </div>
          <div>
            <i class="mdi mdi-currency-usd"></i> {{ modalData.amount
            }}<span style="font-size: 12px; font-weight: bolder"> / Month</span>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="image-container">
            <div class="image-display">
              <div class="featured-image">
                <img
                  v-if="images.length != 0"
                  :src="images[0]"
                  alt="Featured Image"
                />
                <div v-else class="upload-img"><h5>Upload Images</h5></div>
              </div>
              <div
                class="thumbnail-images d-flex align-items-center justify-content-center"
              >
                <div
                  class="thumbnail"
                  v-for="(image, index) in images"
                  :key="index"
                  @click="setFeaturedImage1(image)"
                >
                  <img :src="image" alt="Thumbnail Image" />
                </div>
              </div>
            </div>
          </div>

          <div class="upload__box">
            <div class="upload__btn-box">
              <label class="upload__btn">
                <span class="upload__btnlabel"
                  ><i class="mdi mdi-plus"></i></span
                >Upload Images
                <input
                  type="file"
                  multiple
                  class="upload__inputfile"
                  @change="handleFiles"
                />
              </label>
            </div>
          </div>
        </div>

        <div class="col-sm-12" v-if="modalData != null">
          <hr />
          <p>
            {{ modalData.description }}
          </p>
          <!-- <div v-if="modalData.owner != undefined">

            <Strong>Owner: </Strong>Name: {{ modalData.owner.first_name }}
            {{ modalData.owner.last_name }} <br />
            Phone: {{ modalData.owner.phone }} <br />
            Active? :{{ modalData.owner.is_active }}
          </div>
          <div><strong>Amount: </strong>{{ modalData.amount }} / month</div>
          <div><strong>Images: </strong>{{ modalData.images }}</div>
          <div>
            <strong>Facilities: </strong>
            <span v-for="facility in modalData.facilities" :key="facility.id">
              {{ facility.name }}: {{ facility.amount }} <br />
            </span>
          </div>
          <div><strong>Rating: </strong>{{ modalData.rating }}</div>
          <div v-if="modalData.location != undefined">
            <strong>Location: </strong>Street Address:
            {{ modalData.location.street }} <br />
            Lattitude: {{ modalData.location.latitude }} <br />Longtude:
            {{ modalData.location.longitude }}
          </div>
          <div><strong>Reviews: </strong>{{ modalData.reviews }}</div>
          <div><strong>Visiting Hours: </strong>{{  }}</div>
          <div>
            <strong>Visiting Hours: </strong>

            <span
              v-for="visiting in modalData.visiting_hours"
              :key="visiting.id"
            >
              {{ visiting.day }}, {{ visiting.from }} - {{ visiting.to }} <br />
            </span>
          </div>
          <div><strong>About: </strong>{{ modalData.description }}</div>
          <div><strong>Start Date: </strong>{{ modalData.start_date }}</div> -->
        </div>
      </div>

      <template #modal-footer="{ cancel }">
        <div class="row justify-content-end">
          <div class="col-auto">
            <b-button variant="danger" class="btn-labeled" @click="cancel()">
              <span class="btn-label"><i class="mdi mdi-close"></i></span>Cancel
            </b-button>
          </div>
          <div class="col-auto">
            <b-button
              @click="saveChanges"
              variant="success"
              class="btn-labeled"
            >
              <span class="btn-label"><i class="mdi mdi-check"></i></span>Save
            </b-button>
          </div>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
    modalData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localShowModal: false,
      localModalData: {},
      featuredImage2: "",
      images: [],
      maxLength: 20,
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
      optionsStatus: [
        { value: 0, text: "Pending" },
        { value: 1, text: "Approved" },
        { value: 2, text: "Rejected" },
      ],
      selectedOption: null,
    };
  },
  watch: {
    showModal(value) {
      this.localShowModal = value;
    },
    modalData: {
      handler(newValue) {
        this.localModalData = { ...newValue }; // Makes a local copy of the prop
        this.selectedOption = newValue.status;
      },
      immediate: true,
      // This ensures the handler is called right after the component is created
    },
  },
  computed: {
    featuredImage: {
      get() {
        if (this.modalData.images != undefined) {
          return this.modalData.images[0];
        }
      },
      set(value) {
        this.$store.commit("setFeaturedImage", value);
      },
    },
  },
  methods: {
    ...mapActions("properties", ["postProperty"]),
    updateStatus() {
      this.$store.dispatch("properties/updateProperty", {
        status: this.selectedOption,
        id: this.modalData.id,
      });
      this.$emit("cancel");
    },
    handleFiles(event) {
      const files = Array.from(event.target.files);
      this.files = files;
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => this.images.push(e.target.result);
        reader.readAsDataURL(file);
        this.featuredImage2 = this.images[0];
      });
    },
    setFeaturedImage(image) {
      this.featuredImage = image;
    },
    setFeaturedImage1(image) {
      this.featuredImage2 = image;
    },
    removeImage(index) {
      this.images.splice(index, 1);
    },
    updateUser() {
      this.$store.dispatch("auth/updateUser", this.localModalData); // Use the local copy to update the user
      this.$emit("cancel");
    },
    createUserMethod() {
      this.$store.dispatch("auth/createUser", this.localModalData); // Use the local copy to update the user
      this.$emit("cancel");
    },
    cancelModal() {
      this.$emit("cancel");
    },
    saveChanges() {
      const formData = new FormData();
      this.files.forEach((img, idx) => {
        formData.append(`image-${idx}`, img);
      });
      this.postProperty({ data: formData, id: this.modalData.id });
      this.$emit("cancel");
    },
  },
};
</script>

<style scoped>
.upload-img {
  height: 480px !important;
  align-items: center;
}
</style>
