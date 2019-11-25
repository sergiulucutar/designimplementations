<template>
  <main id="#app">
    <span class="logo">Captured.</span>
    <nav>
      <ul>
        <li>
          <router-link to="/stories">Stories</router-link>
        </li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </nav>
    <!-- <transition name=""> -->
    <router-view></router-view>
    <!-- </transition> -->
  </main>
</template>

<script>
export default {
  name: "app"
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

main {
  width: 100vw;
  height: 100vh;

  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: repeat(6, 1fr);

  font-family: "Roboto", sans-serif;
  // font-family: 'Playfair Display', serif;
}

.logo {
  grid-row: 1;
  grid-column: 2 / span 2;

  margin: var(--s_margin-top);

  color: white;
  font-size: 2em;

  z-index: 2;
}

nav {
  grid-row: 1;
  grid-column: 5;

  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;

    list-style: none;

    margin-top: var(--s_margin-top);
  }
}
</style>
