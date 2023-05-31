<
<template>
  <div
    style="width: 100vw; height: 100vh"
    id="viewer"
    ref="viewRef"
    class="postion-relative"
  >
    <div
      v-if="!tourLoading && hasError"
      class="position-absolute top-50 start-50 translate-middle d-flex flex-column align-items-center"
      style="z-index: 3"
    >
      <p class="mb-4">Unable to load virtual tour!</p>
    </div>
    <div
      v-if="tourLoading"
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
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    hasError: false,
  }),
  computed: {
    ...mapGetters("tour", ["tourLoading", "hotspotNodes"]),
  },
  methods: {
    ...mapActions("tour", ["fetchTour"]),
  },
  async mounted() {
    this.hasError = false;
    await this.fetchTour(this.$route.params.id);

    const currentPanorama = !!this.hotspotNodes.length
      ? this.hotspotNodes[0].panorama
      : null;
    this.viewer = new Viewer({
      container: this.$refs.viewRef,
      panorama: currentPanorama,
      plugins: [VirtualTourPlugin, MarkersPlugin],
    });
    if (currentPanorama) {
      this.tourPlugin = this.viewer.getPlugin(VirtualTourPlugin);
      this.tourPlugin.setNodes(this.hotspotNodes);
    } else {
      this.hasError = true;
    }
  },
};
</script>

<style></style>
