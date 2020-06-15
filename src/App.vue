<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-container>
        <SearchBox />
        <v-spacer></v-spacer>
      </v-container>
    </v-app-bar>

    <v-main>
      <PackageList filtered="true" />
      <HelloWorld />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import SearchBox from "@/components/SearchBox.vue";
import PackageList from "@/components/PackageList.vue";

export default Vue.extend({
  name: "App",

  components: {
    PackageList,
    SearchBox,
    HelloWorld
  },

  data: () => ({
    //
  })
});
</script>
