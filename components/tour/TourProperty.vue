<template>
  <div class="card text-dark mb-4 p-1">
    <div class="card-header text-white bg-transparent mb-1 border border-0">
      Tour Properties
    </div>
    <ul class="list-group list-group-flush shadow-sm">
      <div
        v-for="tourProperty in tourProperies"
        :key="tourProperty.name"
        class="list-group-item rounded-4 mb-2"
      >
        <div class="input-group">
          <input
            type="text"
            class="form-control border border-0 bg-white"
            :aria-label="tourProperty.name"
            :disabled="tourProperty.disabled"
            :placeholder="tourProperty.placeholder"
          />
          <span class="input-group-text border border-0 bg-white"
            ><i
              :class="[
                'mdi mdi-36px',
                tourProperty.disabled ? 'mdi-pencil' : 'mdi-check',
              ]"
              @click="toggleEdit(tourProperty.name)"
            ></i
          ></span>
        </div>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TourProperty",
  data: () => ({
    tourProperies: [
      {
        name: "author",
        placeholder: "Author",
        value: "author",
        disabled: true,
      },
      {
        name: "name",
        placeholder: "Tour name",
        value: "name",
        disabled: true,
      },
    ],
  }),
  methods: {
    toggleEdit(prop) {
      let tourProperty = this.tourProperies.find((el) => el.name === prop);
      tourProperty.disabled = !tourProperty.disabled;
    },
  },
};
</script>

<style></style>
