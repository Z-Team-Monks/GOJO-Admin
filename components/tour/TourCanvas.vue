<template>
  <div id="tour-view" style="position: relative; width: 100%; height: 80vh">
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
      <div style="position: absolute; top: 2%; z-index: 4">
        <b-alert v-model="showErrorAlert" variant="danger" fade dismissible>
          {{ alertMessage }}
        </b-alert>
        <b-alert v-model="showSuccessAlert" variant="success" dismissible fade>
          {{ alertMessage }}
        </b-alert>
      </div>

      <b-modal
        v-model="showModal"
        id="modal-center"
        centered
        title="Select Tour"
        hide-footer
        hide-header
        
      >
        <div class="p-3 w-100 modal-body">
          <div
            class="d-flex align-items-center w-100 justify-content-between px-4"
          >
            <div>
              <b-form-checkbox
                id="checkbox-1"
                v-model="hasTwoWayLink"
                name="checkbox-1"
                value="yes"
                unchecked-value="no"
                class="text-white"
              >
                Two Way Link
              </b-form-checkbox>
            </div>
            <div><h5 class="text-white mb-4">Edit Hostpot</h5></div>
            <div
              class="cursor-pointer bg-light rounded-circle d-flex justify-content-center align-items-center"
              @click="showModal = false"
              style="height: 40px; width: 40px"
            >
              <i class="mdi mdi-close"></i>
            </div>
          </div>
          <div class="mb-10">
            <p class="text-white text-center my-4">Click on the images below</p>
          </div>
          <div class="w-100 d-flex align-items-center justify-content-center">
            <div class="grid-view d-flex flex-wrap scrollbar" id="scrollbar1">
              <div
                v-for="image in choiceImages"
                :key="image.id"
                @click="choosenImageId = image.id"
                :class="[
                  'my-4 mx-2  image-height',
                  choosenImageId == image.id ? 'image-item-selected' : '',
                ]"
              >
                <div class="w-75">
                  <h5 class="mb-1 ps-1 py-1 text-truncate fs-6 text-white">
                    {{ image.name }}
                  </h5>
                </div>
                <img
                  class="m-0"
                  :src="image.panorama"
                  alt=""
                  style="height: 150px; aspect-ratio: 1.6"
                />
              </div>
            </div>
          </div>
          <div class="w-100 d-flex justify-content-end mt-2 btn-sm">
            <div>
              <button
                type="button"
                class="btn btn-success rounded rounded-3"
                @click="linkHostpot"
              >
                Link Tour
              </button>
            </div>
          </div>
        </div>
      </b-modal>
      <b-modal
        v-model="showPublish"
        id="modal-center"
        centered
        title="Publish Tour"
        hide-footer
        hide-header
      >
        <publish-tour />
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
        <button
          @click="setInitialView"
          class="btn btn-light rounded rounded-3 loose-button mr-5"
        >
          Set initial View
        </button>
        <button
          @click="viewMode"
          class="btn btn-light rounded loose-button rounded-3"
        >
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
          class="btn btn-success px-3 my-5 rounded rounded-4"
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
import PublishTour from "./PublishTour.vue";
import { v4 as uuidv4 } from "uuid";
import { mapState, mapActions } from "vuex";

export default {
  name: "TourCanvas",
  props: {
    propertyId: {
      type: String,
    },
  },
  components: {
    PublishTour,
  },
  data: () => ({
    isLinkHotspotOn: false,
    insideCanvas: false,
    showModal: false,
    isPositionSelect: false,
    showPublish: false,
    choosenImageId: null,
    selectedMarkerId: {},
    viewer: null,
    tourPlugin: null,
    markerPlugin: null,
    hasTwoWayLink: "no",
    showSuccessAlert: false,
    showErrorAlert: false,
    dismissSecs: 5,
    dismissCountDown: 0,
    alertMessage: "kfmklfd",
  }),
  computed: {
    ...mapState("tour", [
      "currentView",
      "previewMode",
      "viewPostion",
      "initialView",
      "defaultViewPostion",
      "hotspotNodes",
      "selectedImageId",
    ]),
    choiceImages() {
      return this.hotspotNodes.filter(
        (node) => node.id != this.selectedImageId
      );
    },
  },
  methods: {
    ...mapActions("tour", [
      "setSelectedNode",
      "setPreviewMode",
      "setViewPostion",
      "addMarkers",
      "addLinks",
      "deleteNode",
      "updateLink",
      "setHostspots",
      "addHostspots",
      "setInitialView",
      "postTour",
      "reLink",
    ]),
    showSuccess(msg) {
      this.alertMessage = msg;
      this.showSuccessAlert = true;
    },
    showError(msg) {
      this.alertMessage = msg;
      this.showErrorAlert = true;
    },
    handlePositionSelected(_, data) {
      if (this.previewMode) return;
      if (this.isLinkHotspotOn || this.isPositionSelect) {
        this.setViewPostion({
          longitude: data.longitude,
          latitude: data.latitude + 0.15,
        });
        this.showModal = true;
      }
      this.isLinkHotspotOn = false;
    },
    createHotspot(image, links = []) {
      const node = {
        id: image.id,
        panorama: image.data,
        links: links,
        name: image.name,
      };
      return node;
    },
    createMarker(position, { toNodeId = null, image = null, tooltip = null }) {
      const marker = {
        id: uuidv4(),
        image: image ?? require("~/assets/images/svg/arrow-up.256x256.png"),
        tooltip: `Go to ${tooltip ?? "the next scene"}`,
        width: 48,
        height: 48,
        latitude: position.latitude,
        longitude: position.longitude,
        anchor: "bottom center",
        linksTo: toNodeId,
      };

      return marker;
    },
    async addImages(images) {
      if (!images.length) return;
      const isExistingHotspot = this.hotspotNodes.length > 0;
      const hotspotNodes = images.map((image) => this.createHotspot(image));

      for (let index = 0; index < hotspotNodes.length; index++) {
        if (index == hotspotNodes.length - 1) {
          const nextNode = hotspotNodes[index];
          const nodeTo = isExistingHotspot
            ? this.hotspotNodes[0]
            : hotspotNodes[0];
          nextNode.markers = [
            this.createMarker(this.defaultViewPostion, {
              toNodeId: nodeTo.id,
              tooltip: nextNode.name,
            }),
          ];
          nextNode.links = [
            {
              nodeId: nodeTo.id,
              ...this.defaultViewPostion,
            },
          ];
        } else {
          const currentNode = hotspotNodes[index];
          const nextNode = hotspotNodes[index + 1];
          const marker = this.createMarker(this.defaultViewPostion, {
            toNodeId: nextNode.id,
            tooltip: nextNode.name,
          });
          currentNode.markers = [marker];
          currentNode.links = [
            {
              nodeId: nextNode.id,
              ...this.defaultViewPostion,
            },
          ];
        }
      }

      if (isExistingHotspot) {
        const firstOfNewNode = hotspotNodes[0];
        const lastOfExistingNode =
          this.hotspotNodes[this.hotspotNodes.length - 1];
        this.reLink({
          nodeId: lastOfExistingNode.id,
          toNodeId: this.hotspotNodes[0].id,
          link: {
            nodeId: firstOfNewNode.id,
            ...this.defaultViewPostion,
          },
        });
      }
      if (isExistingHotspot) {
        this.addHostspots(hotspotNodes);
      } else {
        this.setHostspots(hotspotNodes);
      }
      this.tourPlugin.setNodes(this.hotspotNodes, this.currentView);
    },
    linkHostpot() {
      if (this.isPositionSelect) {
        this.updateLink({
          markerId: this.selectedMarkerId,
          imgId: this.choosenImageId,
        });
        this.showSuccess("Link Updated Successfully!");
      } else {
        let currentNode = this.hotspotNodes.find(
          (n) => n.id == this.choosenImageId
        );
        const currentNodeMarker = this.createMarker(this.viewPostion, {
          toNodeId: this.choosenImageId,
          tooltip: currentNode?.name,
        });
        this.addMarkers({ marker: currentNodeMarker });
        this.addLinks({
          link: {
            nodeId: this.choosenImageId,
            ...this.viewPostion,
          },
        });
        if (this.hasTwoWayLink == "yes") {
          currentNode = this.hotspotNodes.find((n) => n.id == this.currentView);
          this.addMarkers({
            marker: this.createMarker(this.viewPostion, {
              toNodeId: this.currentView,
              tooltip: currentNode?.name,
            }),
            toId: this.choosenImageId,
          });
          this.addLinks({
            link: {
              nodeId: this.currentView,
              ...this.viewPostion,
            },
            toId: this.choosenImageId,
          });
        }
        this.showSuccess("Link Added Successfully!");
      }
      this.tourPlugin.setCurrentNode(this.currentView);
      this.showModal = false;
      this.isPositionSelect = false;
    },
    handleMarkerClick({ element: container, id }) {
      if (this.previewMode) return;
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
          this.selectedMarkerId = id;
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
    handleMarkerEdit(_) {
      this.isPositionSelect = true;
      this.showModal = true;
    },
    async handleMarkerDelete(markerId) {
      this.deleteNode(markerId);
      this.markerPlugin.removeMarker(markerId);
      this.tourPlugin.setCurrentNode(this.currentView);
      this.showSuccess("Marker deleted!");
    },
    viewMode() {
      this.setPreviewMode(true);
      this.viewer.enterFullscreen();
    },
    removeNode(_) {
      if (this.hotspotNodes.length > 0) {
        this.tourPlugin.setNodes(this.hotspotNodes, this.hotspotNodes[0].id);
      } else {
        this.viewer.setPanorama(
          require("~/assets/images/default_paranoma.jpg")
        );
      }
    },
    updateSelected(nodeId) {
      this.tourPlugin.setCurrentNode(nodeId);
    },
    async handlePublish() {
      if (!this.nodeConnectionIsValid()) {
        this.showError("Please connect all tour before publishing");
        return;
      }
      this.showPublish = true;
      const formData = new FormData();
      this.hotspotNodes.forEach((data) => {
        formData.append(data.id, data.panorama);
      });

      const allData = {
        initialView: this.currentView,
        defaultViewPosition: this.defaultViewPostion,
        hotspotNodes: this.hotspotNodes.map((data) => ({
          ...data,
          panorama: "",
        })),
      };
      formData.append(`data`, JSON.stringify(allData));
      try {
        await this.postTour({ data: formData, id: this.propertyId });
      } catch (error) {
        this.showPublish = false;
        this.showError("Unable to publish the tour!");
      }
    },
    nodeConnectionIsValid() {
      const nodes = this.hotspotNodes;
      const connectedNodes = nodes.filter((node) => node.links.length);
      const unconnectedNodes = nodes.filter((node) => !node.links.length);
      if (connectedNodes.length == nodes.length) {
        return true;
      }
      if (unconnectedNodes.length) {
        return false;
      }
      return true;
    },
    clearCanvas() {
      this.setHostspots([]);
      location.reload();
    },
  },
  mounted() {
    this.viewer = new Viewer({
      container: this.$refs.viewRef,
      panorama: this.hotspotNodes.find((h) => h.id == this.initialView?.id)
        ?.panorama,
      plugins: [VirtualTourPlugin, MarkersPlugin],
    });

    this.tourPlugin = this.viewer.getPlugin(VirtualTourPlugin);
    this.markerPlugin = this.viewer.getPlugin(MarkersPlugin);

    if (!!this.hotspotNodes.length) {
      this.tourPlugin.setNodes(this.hotspotNodes, this.currentView);
    }

    this.viewer.on("click", this.handlePositionSelected);
    this.tourPlugin.on("node-changed", (e) => {
      const cNode = e.args[0];
      if (cNode) {
        this.setSelectedNode(cNode);
      }
    });
    this.markerPlugin.on("select-marker", ({ args }) => {
      this.handleMarkerClick({ element: args[0].$el, id: args[0].id });
    });
    this.viewer.on("fullscreen-updated", ({ args }) => {
      this.setPreviewMode(args[0]);
    });

    setInterval(() => {
      if (this.showErrorAlert || this.showSuccessAlert) {
        this.showErrorAlert = false;
        this.showSuccessAlert = false;
      }
    }, 4000);
  },
  async beforeDestroy() {
    if (this.viewer) {
      this.viewer.destroy();
    }
  },
};
</script>

<style>
#tour-view .crosshair div {
  cursor: crosshair !important;
}
.loose-button {
  opacity: 75%;
}
#tour-view .image-height {
  height: 30%;
}
#tour-view .canvas-view {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
#modal-center .modal-content {
  width: 1200px;
  background-color: transparent;
}
#modal-center .modal-body {
  padding: 0;
  width: 1000px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #ededed53;
  border-radius: 4px;
}
.edit-modal {
  padding: 1rem;
}
.grid-view {
  height: 500px;
  overflow-y: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
