<template>
  <div class="container-fluid">
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
          <tour-upload @selectImage="handleImage" />
        </div>
        <div class="col-lg-9 col-sm-12">
          <tour-canvas ref="canvasRef" />
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
    selectedImage: null,
  }),
  methods: {
    handleImage(image) {
      this.selectedImage = image;

      const canvasRef = this.$refs.canvasRef;
      canvasRef.updateImage(image.name);
    },
  },
};
</script>

<style></style>
