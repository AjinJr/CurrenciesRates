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
  position: relative;
  grid-template-rows: auto 1fr auto;
  min-height: 100%;
  background: #161623;
  z-index: 1;
}
.app {
}

.content {
  background: #161623;
}

#app::before {
  position: absolute;
  content: "";
  width: 24rem;
  height: 24rem;
  background: linear-gradient(#ffc107, #e91e63);
  border-radius: 50%;
}

#app::after {
  position: absolute;
  content: "";
  width: 16rem;
  height: 16rem;
  background: linear-gradient(#2196f3, #31ff38);
  border-radius: 45%;
  transform: translate(56rem, 32rem);
}

@media (max-width: 1152px) {
  #app::after {
    position: absolute;
    content: "";
    width: 16rem;
    height: 16rem;
    background: linear-gradient(#2196f3, #31ff38);
    border-radius: 45%;
    transform: translate(40rem, 32rem);
  }
}
@media (max-width: 895px) {
  #app::after {
    position: absolute;
    content: "";
    width: 16rem;
    height: 16rem;
    background: linear-gradient(#2196f3, #31ff38);
    border-radius: 45%;
    transform: translate(24rem, 32rem);
  }
}
@media (max-width: 641px) {
  #app::after {
    width: 16rem;
    height: 16rem;
    border-radius: 45%;
    transform: translate(18rem, 32rem);
  }
}
@media (max-width: 641px) {
  #app::after {
    width: 16rem;
    height: 16rem;
    border-radius: 45%;
    transform: translate(4rem, 32rem);
  }
  #app::before {
    width: 20rem;
    height: 20rem;
    transform: translate(2rem, 2rem);
    border-radius: 50%;
  }
}
</style>
