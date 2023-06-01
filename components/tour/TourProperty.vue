<template>
  <div class="card text-dark mb-4">
    <div class="card-header">Tour Properties</div>
    <ul class="list-group list-group-flush">
      <div
        v-for="tourProperty in tourProperties"
        :key="tourProperty.name"
        class="list-group-item"
      >
        <div class="input-group">
          <input
            type="text"
            class="form-control border border-0 bg-white"
            :aria-label="tourProperty.name"
            :disabled="tourProperty.disabled"
            :placeholder="tourProperty.placeholder"
            :value="tourProperty.value"
            @input="updatePropertyValue(tourProperty.name, $event.target.value)"
          />
          <span class="input-group-text border border-0 bg-white"
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
