<template>
  <div class="card bg-light border border-0 mb-4 py-2 px-2 shadow-sm">
    <div class="card-header bg-success mb-1 border border-0">
      Tour Properties
    </div>
    <ul class="list-group list-group-flush">
      <div
        v-for="tourProperty in tourProperties"
        :key="tourProperty.name"
        class="list-group-item mt-2 p-0 border border-0"
      >
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            :aria-label="tourProperty.name"
            :disabled="tourProperty.disabled"
            :placeholder="tourProperty.placeholder"
            :value="tourProperty.value"
            @input="updatePropertyValue(tourProperty.name, $event.target.value)"
          />
          <span class="input-group-text border border-0"
            ><i
              :class="[
                'mdi mdi-24px',
                tourProperty.disabled ? 'mdi-pencil' : 'mdi-check',
              ]"
              @click="toggleEdit(tourProperty)"
            ></i
          ></span>
        </div>
      </div>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "TourProperty",
  data: () => ({
    tourProperties: [
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
    ...mapActions("tour", ["updateProperty"]),
    toggleEdit(data) {
      let tourProperty = this.tourProperties.find(
        (el) => el.name === data.name
      );
      if (!tourProperty.disabled) {
        this.updateProperty(tourProperty);
      }
      tourProperty.disabled = !tourProperty.disabled;
    },
    updatePropertyValue(name, value) {
      let tourProperty = this.tourProperties.find((el) => el.name === name);
      tourProperty.value = value;
    },
  },
};
</script>

<style></style>
