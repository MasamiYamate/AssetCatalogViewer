<template>
  <v-app>
    <Header/>
      <v-main>
        <div id="content">
          <ColorsCatalog/>
        </div>
      </v-main>
      <Footer/>
  </v-app>
</template>

<script>
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import ColorsCatalog from "./components/ColorsCatalog";

export default {
  name: 'App',

  components: {
    Header,
    Footer,
    ColorsCatalog,
  },

  data: () => ({
    //
  }),
};
</script>


<style>
#content {
  margin-right: auto;
  margin-left : auto;
  padding-bottom: 50px;
  max-width: 1280px;
}
</style>