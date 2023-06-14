<template>
  <div>
    <div class="mx-2 mb-4">
      <input
        type="file"
        ref="fileInput"
        style="display: none"
        @change="handleFileChange"
        accept="image/png, image/jpeg"
        multiple
      />
      <div class="d-flex bd-highlight">
        <div class="bd-highlight">
          <button class="btn btn-secondary rounded" @click="clearUpload">
            Clear
          </button>
        </div>
        <div class="pl-2 flex-grow-1 bd-highlight">
          <button class="btn btn-success rounded mb-2" @click="openFileInput">
            Upload Images
          </button>
        </div>
      </div>
    </div>
    <div class="scrollable-div scrollbar p-2" id="scrollbar1">
      <draggable
        @change="onUnpublishedChange"
        v-model="all_images"
        ghost-class="ghost"
      >
        <transition-group>
          <div
            v-for="image in all_images"
            :key="image.id"
            class="card mb-3 text-dark bg-secondary rounded rounded-2"
            @click="handleImageSelect(image)"
          >
            <div
              :class="[
                'p-2 d-flex justify-content-between  rounded rounded-top text-white',
                selectedImageId == image.id ? 'bg-success' : '',
              ]"
            >
              <div class="d-flex w-75">
                <i class="mdi mdi-menu mr-2"></i>
                <h5 class="card-title text-truncate">{{ image.name }}</h5>
              </div>
              <div class="d-flex">
                <i
                  class="mdi mdi-delete mdi-24px"
                  style="color: rgb(169, 24, 24)"
                  @click="deleteItem(image)"
                ></i>
                <i class="mdi mdi-pencil mdi-24px ml-4"></i>
              </div>
            </div>
            <img
              :src="image.data"
              class="card-img-bottom rounded-1"
              alt="..."
              style="max-height: 250px"
            />
          </div>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { v4 as uuidv4 } from "uuid";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "TourUpload",
  components: {
    draggable,
  },
  data: () => ({
    all_images: [],
  }),
  computed: {
    ...mapState("tour", ["selectedImageId"]),
    ...mapGetters("tour", ["hotspotNodes"]),
  },
  methods: {
    ...mapActions("tour", ["deleteImage", "addImages", "setSelectedNode"]),
    openFileInput() {
      this.$refs.fileInput.click();
    },
    deleteItem(image) {
      this.deleteImage(image.id);
      this.all_images = this.extractImages();
      this.$emit("onImageDelete", image.id);
    },
    async handleFileChange(event) {
      const images = event.target.files;
      const uploadedImages = [];
      await Promise.all(
        Array.from(images).map(async (image) => {
          const file = image;
          const reader = new FileReader();
          const result = await new Promise((resolve) => {
            reader.onload = (event) => resolve(event.target.result);
            reader.readAsDataURL(file);
          });

          uploadedImages.unshift({
            id: uuidv4(),
            name: file.name,
            data: result,
          });
          return result;
        })
      );
      this.all_images.push(...uploadedImages);
      this.$emit("onUpload", uploadedImages);
    },
    handleImageSelect(image) {
      this.setSelectedNode(image.id);
      this.$emit("onImageSelected", image.id);
    },
    onUnpublishedChange(e) {
      // console.log(e);
    },
    extractImages() {
      return this.hotspotNodes.map((node) => ({
        id: node.id,
        name: node.name,
        data: node.panorama,
      }));
    },
    clearUpload() {
      this.all_images = [];
      this.$emit("onClearUpload");
    },
  },
  mounted() {
    this.all_images = this.extractImages();
  },
};
</script>

<style>
.scrollable-div {
  max-height: 58vh;
  overflow-y: auto;
}
.ghost {
  opacity: 1;
  background-color: #28a745;
}
</style>
