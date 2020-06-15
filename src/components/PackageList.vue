<template>
  <div>
    <v-container>
      <v-row dense>
        <v-col cols="12" v-for="pkg in packages" :key="pkg['package'].name">
          <PackageCard
            v-bind:item="pkg['package']"
            v-bind:details="x => openModal(x)"
          />
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

            <v-card-text v-if="dialogContext.keywords">
              Keywords: {{ dialogContext.keywords.join(", ") }}
            </v-card-text>

            <v-card-text v-if="dialogContext.author">
              Author: {{ dialogContext.author.name }}
            </v-card-text>

            <v-divider />

            <v-card-actions>
              <v-spacer />
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
import PackageCard from "@/components/PackageCard";
export default {
  name: "PackageList",
  components: { PackageCard },
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
    openModal: function(pkg) {
      this.dialogContext = pkg;
    }
  }
};
</script>

<style scoped></style>
