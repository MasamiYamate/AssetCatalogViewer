<template>
  <v-app id="inspire">
    <v-card class="mx-auto" min-width="300" max-width="400" min-height="100" bottom="50">
      <v-container fluid>
        <v-row dense>
          <v-col v-for="(card, index) in colors" :key="index">
            <v-avatar v-if="card.value.any" :color="card.value.any" size="120">
              <div class="d-flex flex-column">
              <span class="white--text headline">Light</span>
              <span class="white--text headline">{{card.value.any}}</span>
              </div>
            </v-avatar>
            <v-avatar color="indigo" size="120">
              <div class="d-flex flex-column">
              <span class="white--text headline">Light</span>
              <span class="white--text headline">#000000</span>
              </div>
            </v-avatar>
            <v-avatar color="indigo" size="120">
              <div class="d-flex flex-column">
              <span class="white--text headline">Light</span>
              <span class="white--text headline">#000000</span>
              </div>
            </v-avatar>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-app>
</template>

<script>
import data from "../assets/resource/asset-resource.json";

export default {
  name: "Main",

  data: () => ({
    isActive: false,
    colors: data.colors
  }),
};
</script>
