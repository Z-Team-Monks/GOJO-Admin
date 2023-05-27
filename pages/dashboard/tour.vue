<template>
  <div class="container-fluid tour">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Virtual Tour Details</a>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
          <li class="nav-link">Natnael Abay</li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <img
                src="../../assets/images/image 38.png"
                alt="Avatar"
                class="rounded-circle"
                style="width: 40px; height: 40px; object-fit: cover"
              />
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <div>
      <div class="row">
        <div class="col-lg-3 col-sm-12">
          <tour-property />
          <tour-upload
            ref="uploadRef"
            @selectImage="handleImage"
            @onUpload="onUpload"
            @onImageDeleted="handleImageDelete"
          />
        </div>
        <div class="col-lg-9 col-sm-12">
          <div class="text-center">
            <h2 v-if="!selectedImage" class="mt-10">Pick Image to Start</h2>
          </div>
          <tour-canvas
            ref="canvasRef"
            @updateSelectedImage="handleImageChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TourCanvas from "../../components/tour/TourCanvas.vue";
import TourProperty from "../../components/tour/TourProperty.vue";
import TourUpload from "../../components/tour/TourUpload.vue";

export default {
  components: {
    TourUpload,
    TourProperty,
    TourCanvas,
  },
  name: "Tour",
  data: () => ({
    selectedImage: false,
  }),
  methods: {
    handleImage(image) {
      const canvasRef = this.$refs.canvasRef;
      canvasRef.updateImage(image);
    },
    onUpload(images) {
      const canvasRef = this.$refs.canvasRef;
      canvasRef.addImages(images);
      this.selectedImage = true;
    },
    handleImageChange(imageId) {
      const uploadRef = this.$refs.uploadRef;
      uploadRef.updateSelected(imageId);
    },
    handleImageDelete(imageId) {
      const canvasRef = this.$refs.canvasRef;
      canvasRef.nodeRemoved(imageId);
    },
  },
};
</script>

<style scoped>
.tour {
  background: #f4f6f8;
  height: 100vh;
}
</style>
