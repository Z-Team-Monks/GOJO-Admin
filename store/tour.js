export const state = () => ({
  tourProperties: [
    {
      name: "author",
      value: "author",
    },
    {
      name: "name",
      value: "name",
    },
  ],
  defaultViewPostion: {
    latitude: 0.2,
    longitude: 0.5,
  },
  viewPostion: {},
  initialView: null,
  currentView: null,
  hotspotNodes: [],
  selectedImageId: null,
  previewMode: false,
  tourLoading: false,
});


export const mutations = {
  DELETE_IMAGE(state, nodeId) {
    state.hotspotNodes.forEach((node) => {
      if (node.id != nodeId) {
        node.links = node.links.filter((link) => link.nodeId != nodeId);
        node.markers = node.markers.filter(
          (marker) => marker.linksTo != nodeId
        );
      }
    });
    state.hotspotNodes = state.hotspotNodes.filter((node) => node.id != nodeId);
  },
  DELETE_NODE(state, markerId) {
    const currentView = state.hotspotNodes.find(
      (node) => node.id == state.currentView
    );
    const mIdx = currentView.markers.findIndex(
      (marker) => marker.id == markerId
    );
    const marker = currentView.markers[mIdx];

    const lIdx = currentView.links.findIndex(
      (link) => link.nodeId == marker.linksTo
    );

    currentView.links.splice(lIdx, 1);
    currentView.markers.splice(mIdx, 1);
  },
  SET_SELECTED_NODE(state, nodeId) {
    state.currentView = nodeId;
    state.selectedImageId = nodeId;
  },
  SET_PREVIEW_MODE(state, value) {
    state.previewMode = value;
  },
  SET_VIEW_POSTION(state, coordinate) {
    state.viewPostion = coordinate;
  },
  SET_HOTSPOTS(state, hotspotNodes) {
    state.hotspotNodes = hotspotNodes;

    if (state.initialView) {
      state.currentView = state.initialView;
    } else {
      state.currentView = hotspotNodes[0].id;
      state.initialView = state.currentView;
    }
  },
  ADD_HOTSPOTS(state, newHotspotNodes) {
    state.hotspotNodes.push(...newHotspotNodes);
    if (state.initialView) {
      state.currentView = state.initialView;
    } else {
      state.currentView = state.hotspotNodes[0].id;
      state.initialView = state.currentView;
    }
  },
  ADD_MARKERS(state, {marker, toId = state.currentView}) {
    const currentNode = state.hotspotNodes.find((node) => node.id == toId);

    const isDuplicate = currentNode.links.find(lk => lk.nodeId == marker.linksTo)
    if(!isDuplicate){
      currentNode.markers.push(marker);
    }
  },
  ADD_LINKS(state, {link, toId = state.currentView}) {
    const currentNode = state.hotspotNodes.find((node) => node.id == toId);
    const isDuplicate = currentNode.links.find(lk => lk.nodeId == link.nodeId)
    if(!isDuplicate){
      currentNode.links.push(link);
    }
  },
  RE_LINK(state,{ nodeId, toNodeId, link}) {
    const currentView = state.hotspotNodes.find(
      (node) => node.id == nodeId
    );
    const existingLink = currentView.links.find(
      (link) => link.nodeId == toNodeId
    );
    if(existingLink){
      existingLink.nodeId = link.nodeId;
    }else{
      currentView.links.push(link);
    }
  },
  UPDATE_LINK(state, { markerId, imgId }) {
    const currentView = state.hotspotNodes.find(
      (node) => node.id == state.currentView
    );
    const marker = currentView.markers.find(
      (marker) => marker.id == markerId
    );
    const nodeLink = currentView.links.find(
      (link) => link.nodeId == marker.linksTo
    );
    nodeLink.nodeId = imgId;
    marker.linksTo = imgId;
  },
  SET_INITIAL_VIEW(state) {
    state.initialView = state.currentView;
  },
  UPDATE_PROPERTY(state, { name, value }) {
    let tourPropertyIdx = state.tourProperties.findIndex(
      (el) => el.name === name
    );
    state.tourProperties[tourPropertyIdx] = { name, value };
  },
  SET_LOADING(state, status) {
    state.tourLoading = status;
  },
};

export const actions = {
  updateProperty({ commit }, data) {
    commit("UPDATE_PROPERTY", data);
  },
  deleteImage({ commit }, imageId) {
    commit("DELETE_IMAGE", imageId);
  },
  deleteNode({ commit }, val) {
    commit("DELETE_NODE", val);
  },
  setSelectedNode({ commit }, nodeId) {
    commit("SET_SELECTED_NODE", nodeId);
  },
  setPreviewMode({ commit }, value) {
    commit("SET_PREVIEW_MODE", value);
  },
  setViewPostion({ commit }, coordinate) {
    commit("SET_VIEW_POSTION", coordinate);
  },
  setHostspots({ commit }, hotspotNodes) {
    commit("SET_HOTSPOTS", hotspotNodes);
  },
  addHostspots({ commit }, newHotspotNodes) {
    commit("ADD_HOTSPOTS", newHotspotNodes);
  },
  addMarkers({ commit }, val) {
    commit("ADD_MARKERS", val);
  },
  addLinks({ commit }, val) {
    commit("ADD_LINKS", val);
  },
  reLink({ commit }, val) {
    commit("RE_LINK", val);
  },
  updateLink({ commit }, val) {
    commit("UPDATE_LINK", val);
  },
  setInitialView({ commit }) {
    commit("SET_INITIAL_VIEW");
  },
  async fetchTour({ commit }, id) {
    commit("SET_LOADING", true);
    try {
      const res = await fetch(
        `http://192.168.239.207:8000/api/v1/properties/${id}/virtual_tour/`
      );
      const data = await res.json();

      // Check if the response status is OK
      if (res.ok) {
        const { hotspotNodes } = data;
        commit("SET_HOTSPOTS", hotspotNodes);
      } else {
        throw new Error(data.message || "Failed to get tour data");
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
      // Handle error...
    } finally {
      commit("SET_LOADING", false);
    }
  },
  async postTour({ commit }, { _data, id }) {
    commit("SET_LOADING", true);
    try {
      const res = await fetch(
        `http://192.168.239.207:8000/api/v1/properties/${id}/virtual_tour/`,
        { method: "POST", body: _data }
      );
      const data = await res.json();
      // Check if the response status is OK
      if (res.ok) {
        console.log(data);
      } else {
        throw new Error(data.message || "Failed to get tour data");
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
      // Handle error...
    } finally {
      commit("SET_LOADING", false);
    }
  },
};

export const getters = {
  defaultViewPostion: (state) => state.defaultViewPostion,
  hotspotNodes: (state) => state.hotspotNodes,
  selectedImageId: (state) => state.selectedImageId,
  currentView: (state) => state.currentView,
  previewMode: (state) => state.previewMode,
  viewPostion: (state) => state.viewPostion,
  initialView: (state) => state.initialView,
  tourLoading: (state) => state.tourLoading,
};
