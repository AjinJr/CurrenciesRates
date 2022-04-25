<template>
  <Header class="header" />
  <router-view />
  <Footer class="footer" />
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
html {
  height: 100%;
}

body {
  height: 100%;
}

#app {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100%;
}
</style>
