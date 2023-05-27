<template>
  <div ref="confettiTarget" class="w-100 confetti-target p-3">
    <div class="w-100 mb-5 border border-1 p-2 py-5 rounded rounded-2">
      <h4 class="text-center mb-2">Publishing Tour...</h4>
      <div>
        <b-progress
          :value="uploadProgress"
          :max="100"
          show-progress
          animated
        ></b-progress>
      </div>
    </div>
    <div
      v-if="uploadProgress >= 100"
      class="d-flex flex-column align-items-center"
    >
      <h5>Here is the link to your hosted tour</h5>
      <div class="d-flex align-items-center">
        <div class="border border-1 px-3 py-2 rounded rounded-2">
          <a href="#" class="text-dark"
            >https://icon-sets.iconify.design/clarity/copy-line/</a
          >
        </div>
        <i
          role="button"
          class="mdi mdi-content-copy ml-2 mdi-36px cursor-pointer"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
import confetti from "canvas-confetti";
export default {
  name: "TourPublish",
  data: () => ({
    uploadProgress: 0,
    colors: ["#8b5642", "#6a696b"],
    end: Date.now() + 30 * 500,
  }),
  methods: {
    publishTour() {},
    frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 100,
        origin: {
          x: 0.45,
        },
        colors: this.colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 100,
        origin: {
          x: 0.8,
        },
        colors: this.colors,
      });
    },
  },
  mounted() {
    // setInterval(() => {
    //   if (Date.now() < this.end) {
    //     requestAnimationFrame(this.frame);
    //   }
    // }, 50);
  },
};
</script>

<style>
.confetti-target {
  background: rgb(44, 149, 121);
  background: linear-gradient(
    90deg,
    rgba(44, 149, 121, 1) 0%,
    rgba(156, 148, 233, 1) 100%
  );
}
</style>
