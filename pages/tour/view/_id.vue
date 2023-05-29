<
<template>
  <div
    style="width: 100vw; height: 100vh"
    id="viewer"
    ref="viewRef"
    class="postion-relative"
  >
    <div
      v-if="isLoading"
      class="position-absolute top-50 start-50 translate-middle d-flex flex-column align-items-center"
      style="z-index: 2"
    >
      <p class="mb-4">Please wait while we load the 360 view...</p>
      <b-spinner
        style="width: 5rem; height: 5rem"
        label="Small Spinner"
        large
        variant="success"
      ></b-spinner>
    </div>
  </div>
</template>

<script>
import { Viewer } from "photo-sphere-viewer";
import { VirtualTourPlugin } from "photo-sphere-viewer/dist/plugins/virtual-tour";
import { MarkersPlugin } from "photo-sphere-viewer/dist/plugins/markers";

export default {
  data: () => ({
    isLoading: false,
  }),
  async mounted() {
    // axios.fetchData()

    this.viewer = new Viewer({
      container: this.$refs.viewRef,
      panorama: null,
      plugins: [VirtualTourPlugin, MarkersPlugin],
      lang: {
        fullscreen: "Fullscreen",
      },
    });
    this.tourPlugin = this.viewer.getPlugin(VirtualTourPlugin);
    this.markerPlugin = this.viewer.getPlugin(MarkersPlugin);
  },
};
</script>

<style></style>
>
