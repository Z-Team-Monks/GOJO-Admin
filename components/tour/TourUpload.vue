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
            <div class="p-2 d-flex justify-content-between">
              <div class="d-flex w-75">
                <i class="mdi mdi-menu mr-2"></i>
                <h5 class="card-title text-truncate">{{ image.name }}</h5>
              </div>
              <div class="d-flex">
                <i
                  class="mdi mdi-delete mdi-36px"
                  style="color: rgb(169, 24, 24)"
                  @click="deleteImage(image.name)"
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
  }),
  methods: {
    openFileInput() {
      this.$refs.fileInput.click();
    },
    deleteImage(name) {
      this.images = this.images.filter((el) => el.name != name);
    },
    handleFileChange(event) {
      const images = event.target.files;
      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        const reader = new FileReader();
        const vm = this;
        reader.onload = function (event) {
          vm.images.unshift({ name: file.name, data: event.target.result });
        };

        reader.readAsDataURL(file);
      }
    },
    handleImageSelect(image) {
      this.$emit("selectImage", image);
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
