<template>
  <div>
    <v-container>
      <v-row dense>
        <v-col cols="12" v-for="pkg in packages" :key="pkg['package'].name">
          <v-card>
            <v-card-title>{{ pkg["package"].name }}</v-card-title>
            <v-card-text>{{ pkg["package"].description }}</v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="deep-purple accent-4"
                v-on:click="openModal(pkg['package'])"
              >
                Details
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <div class="text-center">
        <v-dialog v-model="dialogContext" v-if="dialogContext" width="500">
          <v-card>
            <v-card-title primary-title>
              {{ dialogContext.name }} version {{ dialogContext.version }}
            </v-card-title>

            <v-card-text>
              {{ dialogContext.description }}
            </v-card-text>

            <v-card-text>
              Keywords: {{ dialogContext.keywords.join(", ") }}
            </v-card-text>

            <v-card-text> Author: {{ dialogContext.author.name }} </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialogContext = null">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "PackageList",
  data: function() {
    return {
      modal: false,
      dialogContext: null
    };
  },
  computed: {
    packages: {
      get: function() {
        return this.$store.state.packages;
      }
    },
    total: {
      get: function() {
        return this.$store.state.totalPackages;
      }
    }
  },
  methods: {
    openModal: function(pkg, event) {
      this.dialogContext = pkg;
      console.log(pkg);
      return;
    }
  }
};
</script>

<style scoped></style>
