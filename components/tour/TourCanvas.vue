<template>
  <div style="position: relative; width: 100%; height: 80vh">
    <div
      id="viewer"
      ref="viewRef"
      style="position: absolute; width: 100%; height: 100%; left: 0; top: 0"
    ></div>
    <div
      class="d-flex justify-content-center"
      style="width: 100%; position: absolute; bottom: 8%"
    >
      <div class="d-flex flex-row w-50">
        <button class="btn btn-light rounded rounded-3 mr-5">
          Link Hostpot
        </button>
        <button class="btn btn-light rounded rounded-3 mr-5">
          Set initial View
        </button>
        <button class="btn btn-light rounded rounded-3">Preview</button>
      </div>
    </div>
    <div
      style="width: 100%; position: absolute; bottom: -15%"
      class="d-flex flex-row justify-content-end"
    >
      <div>
        <button type="button" class="btn btn-success px-5 my-5">Publish</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Viewer, EquirectangularAdapter } from "photo-sphere-viewer";

export default {
  name: "TourCanvas",
  data: () => ({
    viewer: null,
    currentImage: require("~/assets/images/house-360.jpg"),
  }),
  methods: {
    updateImage(imageName) {
      this.viewer.setPanorama(require(`~/assets/images/${imageName}`));
    },
  },
  mounted() {
    this.viewer = new Viewer({
      adapter: [EquirectangularAdapter, { resolution: 64 }],
      container: this.$refs.viewRef,
      panorama: this.currentImage,
    });
  },
  beforeDestroy() {
    if (this.viewer) {
      this.viewer.destroy();
    }
  },
};
</script>

<style></style>
