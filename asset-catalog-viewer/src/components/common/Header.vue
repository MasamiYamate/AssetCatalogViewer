<template>
  <header>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Asset catalog viewer</v-toolbar-title>
      <v-tabs>
          <v-tab
            v-for="(menuItem, index) in menuItems"
            :key="index"
          >
            {{ menuItem.name }}
          </v-tab>
        </v-tabs>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item v-for="(menuItem, index) in menuItems" :key="index">
            <v-list-item-title>{{ menuItem.name }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </header>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      menuItems: [
        {
          name: "Colors",
          url: "#aa",
        },
        {
          name: "Images",
          url: "#",
        },
      ],
    };
  },
};
</script>
 
<style lang="scss" scoped>
.v-toolbar__title {
  overflow: visible !important;
  margin-right: 50px !important;
}

.v-app-bar__nav-icon {
  @include display_pc {
    display: none !important;
  }
}

.v-tabs {
  display: none;
 
  @include display_pc {
    display: block !important;
  }
}
</style>