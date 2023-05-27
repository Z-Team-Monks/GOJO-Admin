<template>
  <div style="position: relative; width: 100%; height: 80vh">
    <div
      id="viewer"
      ref="viewRef"
      @mouseenter="insideCanvas = true"
      @mouseleave="insideCanvas = false"
      :class="[
        'canvas-view',
        insideCanvas && isLinkHotspotOn ? 'crosshair' : 'default',
      ]"
    >
      <b-modal
        v-model="showModal"
        id="modal-center"
        centered
        title="Select Tour"
        hide-footer
        hide-header
      >
        <div
          class="d-flex align-items-center w-100 justify-content-between px-4"
        >
          <div></div>
          <div><h5 class="text-white mb-4">Edit Hostpot</h5></div>
          <div
            class="cursor-pointer bg-light rounded-circle d-flex justify-content-center align-items-center"
            @click="showModal = false"
            style="height: 40px; width: 40px"
          >
            <i class="mdi mdi-close"></i>
          </div>
        </div>
        <div class="d-flex align-items-center w-25 justify-content-center">
          <b-button class="mr-1" squared :size="'sm'" variant="light"
            >Edit</b-button
          >
          <b-button class="ml-1" squared :size="'sm'" variant="light"
            >Delete</b-button
          >
        </div>
        <div class="mb-10">
          <p class="text-white text-center my-4">Click on the images below</p>
        </div>
        <div class="grid-view">
          <div
            v-for="node in getImages()"
            :key="node.id"
            @click="handleImageSelect(node)"
            :class="[selectedImageId == node.id ? 'image-item-selected' : '']"
          >
            <h5 class="mb-1 ps-1 py-1">Tour</h5>
            <img
              class="m-0"
              :src="node.panorama"
              alt=""
              style="height: 150px; aspect-ratio: 1.6"
            />
          </div>
        </div>
        <div class="w-100 d-flex justify-content-end">
          <div>
            <b-button
              @click="linkHostpot"
              :size="'sm'"
              variant="outline-dark"
              pill
              >Link</b-button
            >
          </div>
        </div>
      </b-modal>
    </div>
    <div
      class="d-flex justify-content-center"
      style="width: 100%; position: absolute; bottom: 8%"
    >
      <div class="d-flex flex-row w-50">
        <button
          :class="[
            'btn  rounded rounded-3 mr-5 loose-button',
            isLinkHotspotOn ? 'btn-dark' : 'btn-light',
          ]"
          @click="isLinkHotspotOn = !isLinkHotspotOn"
        >
          Link Hostpot
        </button>
        <button class="btn btn-light rounded rounded-3 loose-button mr-5">
          Set initial View
        </button>
        <button class="btn btn-light rounded loose-button rounded-3">
          Preview
        </button>
      </div>
    </div>
    <div
      style="width: 100%; position: absolute; bottom: -15%"
      class="d-flex flex-row justify-content-end"
    >
      <div>
        <button
          @click="handlePublish"
          type="button"
          class="btn btn-success px-5 my-5"
        >
          Publish
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Viewer } from "photo-sphere-viewer";
import { VirtualTourPlugin } from "photo-sphere-viewer/dist/plugins/virtual-tour";
import { MarkersPlugin } from "photo-sphere-viewer/dist/plugins/markers";

export default {
  name: "TourCanvas",
  data: () => ({
    viewer: null,
    tourPlugin: null,
    markerPlugin: null,
    isLinkHotspotOn: false,
    insideCanvas: false,
    viewPostion: {
      latitude: 0.2,
      longitude: 0.5,
    },
    currentView: undefined,
    hotspotNodes: [],
    images: [],
    showModal: false,
    selectedImageId: null,
    isPositionSelect: false,
    prevPosition: {},
  }),
  methods: {
    updateImage(image) {
      const currentNode = this.hotspotNodes.find((node) => node.id == image.id);
      this.currentView = currentNode;
      this.tourPlugin.setCurrentNode(currentNode.id);
    },
    handlePositionSelected(_, data) {
      if (this.isLinkHotspotOn || this.isPositionSelect) {
        const { longitude, latitude } = data;
        this.viewPostion = { longitude, latitude };
        this.showModal = true;
      }
      this.isLinkHotspotOn = false;
    },
    createHotspot(image, links = []) {
      const node = {
        id: image.id,
        panorama: image.data,
        links: links,
      };
      return node;
    },
    createMarker(pos, toNodeId, image = null) {
      const randomDecimal = Math.random();
      const randomNumber = (randomDecimal * (10 ^ (8 - 10) ^ (5 + 1)) + 10) ^ 5;
      const marker = {
        id: Math.floor(randomNumber),
        image: image ?? require("~/assets/images/svg/arrow-up.256x256.png"),
        tooltip: "Move to the next scene",
        width: 48,
        height: 48,
        latitude: pos.latitude,
        longitude: pos.longitude,
        anchor: "bottom center",
      };

      return marker;
    },
    addImages(images) {
      if (!images.length) return;
      this.hotspotNodes = images.map((image) => this.createHotspot(image));
      for (let index = 0; index < this.hotspotNodes.length - 1; index++) {
        const currentNode = this.hotspotNodes[index];
        const nextNode = this.hotspotNodes[index + 1];
        const marker = this.createMarker(this.viewPostion);
        currentNode.links = [
          {
            nodeId: nextNode.id,
            ...this.viewPostion,
          },
        ];
        currentNode.markers = [marker];

        if (index + 1 == this.hotspotNodes.length - 1) {
          nextNode.links = [
            {
              nodeId: this.hotspotNodes[0].id,
              ...this.viewPostion,
            },
          ];
          nextNode.markers = [this.createMarker(this.viewPostion)];
        }
      }

      this.tourPlugin.setNodes(this.hotspotNodes, this.hotspotNodes[0].id);
      this.images = images;
      this.currentView = images[0];
    },
    handleImageSelect(node) {
      this.selectedImageId = this.selectedImageId ? null : node.id;
    },
    linkHostpot() {
      const currentNode = this.hotspotNodes.find(
        (node) => node.id == this.currentView.id
      );
      if (this.isPositionSelect) {
        const n = currentNode.links.find(
          (link) =>
            link.latitude == this.prevPosition.latitude &&
            link.longitude == this.prevPosition.longitude
        );
        n.nodeId = this.selectedImageId;
      } else {
        const currentNodeMarker = this.createMarker(this.viewPostion);
        currentNode.links.push({
          nodeId: this.selectedImageId,
          ...this.viewPostion,
        });
        currentNode.markers.push(currentNodeMarker);
      }
      this.tourPlugin.setCurrentNode(currentNode.id);
      this.viewer.refreshUi("rebuilding");
      this.showModal = false;
      this.isPositionSelect = false;
    },
    getImages() {
      return this.hotspotNodes.filter((node) => node.id != this.currentView.id);
    },
    handlePublish() {
      // const formData = FormData();
      // formData.append(`viewPosition`, this.viewPostion);
      // const d = [
      //   {
      //     nodeId: "",
      //     links: [{}],
      //     markers: [
      //       {
      //         image: "image",
      //       },
      //     ],
      //     panorama: "image",
      //   },
      // ];
      // this.hotspotNodes.forEach((data, index) => {
      //   const nodeData = Object.assign({}, data);
      //   formData.append(`nodeData[${index}][image]`, nodeData.panorama);
      //   nodeData.panorama = undefined;
      //   formData.append(`nodeData[${index}][node]`, nodeData);
      // });
    },
    handleMarkerClick({ element: container, id }) {
      const exits = container.classList.contains("added-marker");
      if (exits) {
        const spanElement = container.querySelectorAll("div span");
        spanElement.forEach((el) => {
          const isDefault = el.classList.contains("marker-btn-reset");
          if (isDefault) {
            el.classList.remove("marker-btn-reset");
          } else {
            el.classList.add("marker-btn-reset");
          }
        });
        return;
      }
      container.classList.add("added-marker");
      const buttons = [
        { id: 1, content: `<i class="mdi mdi-pencil"></i>` },
        { id: 2, content: `<i class="mdi mdi-delete"></i>` },
      ];
      const btnContainer = document.createElement("div");
      buttons.forEach((button, idx) => {
        const btn = document.createElement("span");
        const div = document.createElement("div");
        btn.innerHTML = button.content;

        btn.classList.add("marker-btn", `marker-btn-${idx}`);
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          if (buttons[idx].id == 1) {
            this.handleMarkerEdit(id);
          }
          if (buttons[idx].id == 2) {
            this.handleMarkerDelete(id);
          }
        });
        div.appendChild(btn);
        btnContainer.appendChild(div);
      });
      btnContainer.classList.add("marker-btn-container");
      container.appendChild(btnContainer);
    },
    handleMarkerEdit(id) {
      const marker = this.markerPlugin.getMarker(id);
      const { latitude, longitude } = marker.config;
      this.prevPosition = { latitude, longitude };
      this.isPositionSelect = true;
      this.showModal = true;
    },
    handleMarkerDelete(id) {
      const currentNode = this.hotspotNodes.find(
        (node) => node.id == this.currentView.id
      );
      const nIdx = currentNode.links.findIndex(
        (link) =>
          link.latitude == this.prevPosition.latitude &&
          link.longitude == this.prevPosition.longitude
      );
      currentNode.links.splice(nIdx, 1);
      const mIdx = currentNode.markers.findIndex((marker) => marker.id == id);
      currentNode.markers.splice(mIdx, 1);

      this.tourPlugin.setCurrentNode(currentNode.id);
      this.viewer.refreshUi("rebuilding");
    },
  },
  mounted() {
    this.viewer = new Viewer({
      container: this.$refs.viewRef,
      panorama: this.selectedView,
      plugins: [VirtualTourPlugin, MarkersPlugin],
    });
    this.tourPlugin = this.viewer.getPlugin(VirtualTourPlugin);
    this.markerPlugin = this.viewer.getPlugin(MarkersPlugin);
    this.viewer.on("click", this.handlePositionSelected);
    this.tourPlugin.on("node-changed", (e) => {
      const cNode = e.args[0];
      if (cNode) {
        this.$emit("updateSelectedImage", cNode);
        this.currentView = this.hotspotNodes.find((node) => node.id == cNode);
      }
    });
    this.markerPlugin.on("select-marker", ({ args }) => {
      this.handleMarkerClick({ element: args[0].$el, id: args[0].id });
    });
  },
  beforeDestroy() {
    if (this.viewer) {
      this.viewer.destroy();
    }
  },
};
</script>

<style>
.crosshair div {
  cursor: crosshair !important;
}
.loose-button {
  opacity: 75%;
}
.canvas-view {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  width: 1200px;
  background-color: transparent;
}
.modal-body {
  width: 1200px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #ededed53;
  border-radius: 4px;
}
.grid-view {
  width: 80%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  place-items: center;
  place-content: center;
}
.self-align {
  justify-self: end;
}
.grid-view > div {
  background-color: #109f4d;
  border-radius: 4px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
.image-item-selected {
  border: 4px solid rgb(255, 255, 255);
  border-radius: 8px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 1px;
}
.marker-btn-container {
  display: flex;
  position: relative;
}
.marker-btn {
  position: absolute;
  transition: all 0.2s cubic-bezier(0.42, 0, 0.58, 1);
  top: 80px;
  background-color: lightgray;
  border-radius: 50%;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.marker-btn-0 {
  left: -50px;
}
.marker-btn-1 {
  right: -50px;
}
.marker-btn-reset {
  animation: slide-in 0.2s forwards cubic-bezier(0.42, 0, 1, 1);
}
@keyframes slide-in {
  100% {
    top: 0;
    left: 0;
    right: 0;
    visibility: hidden;
  }
}
</style>
