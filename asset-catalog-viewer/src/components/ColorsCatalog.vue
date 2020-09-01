<template>
  <v-app id="inspire">
    <v-card class="mx-auto" min-width="300" bottom="50">
      <v-container fluid>
        <v-row dense>
          <v-col v-for="(card, index) in colors" :key="index">
            <v-card-title>{{card.name}}</v-card-title>
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
