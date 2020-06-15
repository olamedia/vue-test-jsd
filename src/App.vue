<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-container>
        <SearchBox />
        <v-spacer></v-spacer>
      </v-container>
    </v-app-bar>

    <v-main>
      <PackageList />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import SearchBox from "@/components/SearchBox.vue";
import PackageList from "@/components/PackageList.vue";

export default Vue.extend({
  name: "App",

  components: {
    PackageList,
    SearchBox
  },

  data: () => ({
    //
  })
});
</script>
