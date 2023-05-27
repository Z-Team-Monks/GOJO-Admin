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
      <button class="btn btn-success rounded" @click="openFileInput">
        Upload Images
      </button>
    </div>
    <div class="scrollable-div">
      <draggable v-model="images" ghost-class="ghost">
        <transition-group>
          <div
            v-for="image in images"
            :key="image.name"
            class="card mb-3 text-dark"
            @click="handleImageSelect(image)"
          >
            <div
              :class="[
                'p-2 d-flex justify-content-between',
                isSelectedImage(image) ? 'bg-info text-white' : '',
              ]"
            >
              <div class="d-flex w-75">
                <i class="mdi mdi-menu mr-2"></i>
                <h5 class="card-title text-truncate">{{ image.name }}</h5>
              </div>
              <div class="d-flex">
                <i
                  class="mdi mdi-delete mdi-36px"
                  style="color: rgb(169, 24, 24)"
                  @click="deleteImage(image)"
                ></i>
                <i class="mdi mdi-pencil mdi-36px ml-4"></i>
              </div>
            </div>
            <img
              :src="image.data"
              class="card-img-bottom"
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

export default {
  name: "TourUpload",
  components: {
    draggable,
  },
  data: () => ({
    images: [],
    selectedImage: null,
  }),
  methods: {
    openFileInput() {
      this.$refs.fileInput.click();
    },
    deleteImage(image) {
      this.images = this.images.filter((el) => el.name != image.name);
      this.$emit("onImageDeleted", image.id);
    },
    async handleFileChange(event) {
      const images = event.target.files;
      const vm = this;

      await Promise.all(
        Array.from(images).map(async (image) => {
          const file = image;
          const reader = new FileReader();
          const result = await new Promise((resolve) => {
            reader.onload = (event) => resolve(event.target.result);
            reader.readAsDataURL(file);
          });

          vm.images.unshift({
            id: Date.now(),
            name: file.name,
            data: result,
          });
          return result;
        })
      );
      this.selectedImage = this.images[0];
      vm.$emit("onUpload", this.images);
    },
    handleImageSelect(image) {
      this.selectedImage = image;
      this.$emit("selectImage", image);
    },
    isSelectedImage(image) {
      return this.selectedImage && image.id == this.selectedImage.id;
    },
    updateSelected(imageId) {
      this.selectedImage = this.images.find((img) => img.id == imageId);
    },
  },
};
</script>

<style>
.scrollable-div {
  max-height: 68vh;
  overflow-y: auto;
}
.ghost {
  opacity: 1;
  background-color: #28a745;
  /* Add any other styles for the dragging item */
}
</style>
