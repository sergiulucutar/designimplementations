<template>
  <section id="#app">
    <home></home>
    <middle></middle>
    <stories></stories>
  </section>
</template>

<script>
import Home from "./routes/Home.vue";
import Middle from "./routes/Middle.vue";
import Stories from "./routes/Stories.vue";

export default {
  name: "app",
  components: {
    home: Home,
    middle: Middle,
    stories: Stories
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Playfair+Display:400,700|Roboto&display=swap");

:root {
  --s_margin-top: 20px;
}

html {
  font-size: 16px;

  @media screen and (min-width: 900px) {
    font-size: 18px;
  }

  @media screen and (min-width: 1200px) {
    font-size: 20px;
  }
}

#app {
  width: 100vw;
  height: 100vh;

  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: repeat(6, 1fr);

  font-family: "Roboto", sans-serif;
  // font-family: 'Playfair Display', serif;

  overflow-x: hidden;
}
</style>
