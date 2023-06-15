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
    ...mapGetters("tour", ["tourLoading", "hotspotNodes", "initialView"]),
  },
  methods: {
    ...mapActions("tour", ["fetchTour"]),
    parseNodes(nodes) {
      return nodes.map((node) => ({
        ...node,
        markers: node.markers.map((marker) => ({
          ...marker,
          image: require("~/assets/images/svg/arrow-up.256x256.png"),
        })),
      }));
    },
  },
  async mounted() {
    this.hasError = false;
    const tourId = this.$route.params.id;
    if (!tourId) {
      this.$router.push("/dashboard/properties");
    }
    await this.fetchTour(tourId);
    let currentPanorama = null;

    if (this.initialView && !!this.hotspotNodes.length) {
      currentPanorama = this.hotspotNodes.find(
        (node) => node.id == this.initialView
      )?.panorama;

      if (!currentPanorama) {
        currentPanorama = this.hotspotNodes[0]?.panorama;
      }
    } else if (!!this.hotspotNodes.length) {
      currentPanorama = this.hotspotNodes[0]?.panorama;
    }

    this.viewer = new Viewer({
      container: this.$refs.viewRef,
      panorama: currentPanorama,
      plugins: [VirtualTourPlugin, MarkersPlugin],
    });
    if (currentPanorama) {
      this.tourPlugin = this.viewer.getPlugin(VirtualTourPlugin);
      this.tourPlugin.setNodes(
        this.parseNodes(this.hotspotNodes),
        this.initialView ?? this.hotspotNodes[0].id
      );
    } else {
      this.hasError = true;
    }
  },
};
</script>

<style></style>
