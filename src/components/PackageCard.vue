<template>
  <v-card>
    <v-card-title>{{ item.name }}</v-card-title>
    <v-card-text>{{ item.description }} </v-card-text>
    <v-card-text><span v-html="badge"></span></v-card-text>
    <v-card-actions>
      <v-btn text color="deep-purple accent-4" v-on:click="details(item)">
        Details
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "PackageCard",
  props: ["item", "details"],
  computed: {
    badgeUrl: function() {
      return (
        "https://data.jsdelivr.com/v1/package/npm/" +
        this.item.name +
        "/badge?style=rounded"
      );
    },
    badge: function() {
      return '<img src="' + this.badgeUrl + '" alt="" />';
    }
  }
};
</script>

<style scoped></style>
