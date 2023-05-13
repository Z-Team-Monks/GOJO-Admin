<template>
  <div>
    <p v-if="!image" class="text-center">No Image Selected</p>
    <div v-if="image" style="position: relative">
      <div
        class="d-flex flex-column py-2"
        style="position: absolute; right: 2%"
      >
        <i class="mdi mdi-plus mdi-36px bg-white mb-2 p-2 rounded"></i>
        <i class="mdi mdi-minus mdi-36px bg-white mb-2 p-2 rounded"></i>
        <i class="mdi mdi-crop-free mdi-36px bg-white mb-2 p-2 rounded"></i>
      </div>
      <div
        class="d-flex justify-content-center"
        style="width: 100%; position: absolute; bottom: 5%"
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
      <img
        class="rounded rounded-5"
        :src="image.data"
        style="height: 80vh; width: 100%"
      />
    </div>
    <div class="d-flex flex-row justify-content-end">
      <div>
        <button type="button" class="btn btn-success px-5 my-5" v-if="image">
          Publish
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TourCanvas",
  props: ["image"],
  data: () => ({}),
};
</script>

<style></style>
