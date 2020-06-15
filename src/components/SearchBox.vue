<template>
  <div>
    <v-text-field
      flat
      solo-inverted
      hide-details
      prepend-inner-icon="mdi-magnify"
      label="Search"
      class="hidden-sm-and-down"
      v-model="query"
    />
  </div>
</template>

<script>
import { actions, mutations } from "@/store";

export default {
  name: "SearchBox",
  computed: {
    query: {
      get() {
        return this.$store.state.query;
      },
      set(value) {
        console.log(value);
        this.$store.dispatch(actions.NEW_QUERY, value);
      }
    }
  }
};
</script>

<style scoped></style>
