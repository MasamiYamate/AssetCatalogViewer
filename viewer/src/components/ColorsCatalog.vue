<template>
  <v-app id="inspire">
    <v-simple-table height="300px">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Any</th>
            <th class="text-left">Dark</th>
            <th class="text-left">Light</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="color in colors" :key="color.name">
            <td>{{ color.name }}</td>
            <td :bgcolor="color.value.any.hex">{{ color.value.any.hex }}</td>
            <td :bgcolor="color.value.dark.hex">{{ color.value.dark.hex }}</td>
            <td :bgcolor="color.value.light.hex">{{ color.value.light.hex }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
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
