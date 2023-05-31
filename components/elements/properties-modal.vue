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
      </template>
      <div class="row">
        <div class="col-sm-6">
          <div class="image-container">
            <div class="image-display">
              <div class="featured-image">
                <img :src="featuredImage" alt="Featured Image" />
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
                <img :src="featuredImage2" alt="Featured Image" />
              </div>
              <div class="thumbnail-images">
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
            If you want a great seafront location, Villa Dionysos is the ideal
            choice! Its location secures fantastic panoramic sea views, and
            you'll even have your own private access to the small pebble beach
            at the end of the garden. And not only that, this fantastic 3
            bedroom house also has a large private swimming pool and lawn. The
            main beach and facilities of Sidari are all within a short drive.
            Pool heating, WiFi and air conditioning/heating in the bedrooms are
            included. Welcome to your new holiday home, situated in the north of
            Corfu island near the village Agios Ioannis Karousadon. This house
            will give you all the amenities and peacefulness you deserve, from a
            private swimming pool to a private beach. This 3 bedroom house is
            perfect for a family/friend and also couples holiday unwind near the
            pool, enjoy the summer night with a barbecue dinner and relax
            staring the stars and most of all feel your Greek holidays with this
            typical Greek house situated near countless small beaches, bars and
            restaurants. Book your holidays now before it’s too late!
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
            <b-button variant="success" class="btn-labeled">
              <span class="btn-label"><i class="mdi mdi-check"></i></span>Save
            </b-button>
          </div>
        </div>
      </template>
    </b-modal>
  </div>
</template>
  
  <script>
//   import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
    modalData: {
      type: Array,
    },
  },
  data() {
    return {
      localShowModal: false,
      localModalData: {},
      featuredImage2:'https://www.shutterstock.com/image-vector/upload-icon-vector-illustration-on-260nw-1909181089.jpg',
      images: [
        'https://www.shutterstock.com/image-vector/upload-icon-vector-illustration-on-260nw-1909181089.jpg'
      ],
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
    };
  },
  watch: {
    showModal(value) {
      this.localShowModal = value;
    },
    modalData: {
      handler(newValue) {
        this.localModalData = { ...newValue }; // Makes a local copy of the prop
      },
      immediate: true, // This ensures the handler is called right after the component is created
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
    handleFiles(event) {
      const files = Array.from(event.target.files);
      files.forEach((file) => {
        if (this.images.length < this.maxLength && file.type.match("image.*")) {
          const reader = new FileReader();
          reader.onload = (e) => this.images.push(e.target.result);
          reader.readAsDataURL(file);
        }
      });
    },
    setFeaturedImage(image) {
      this.featuredImage = image;
    },
    setFeaturedImage1(image){
        this.featuredImage2 = image
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
      // Save changes logic
      // ...
      this.$emit("save");
    },
  },
};
</script>

  <style lang="sass" scoped>
</style>