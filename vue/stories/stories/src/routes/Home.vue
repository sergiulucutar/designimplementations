<template>
  <div class="home">
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
    <div class="title">
      <h1>
        Capture with a
        <span>click.</span>
      </h1>
    </div>
    <!-- <div class="banner">
      <div>
        <div class="banner_wrapper">
          <span>* Capture a Story, Document a Memory</span>
          <span>* Capture a Story, Document a Memory</span>
          <span>* Capture a Story, Document a Memory</span>
          <span>* Capture a Story, Document a Memory</span>
          <span>* Capture a Story, Document a Memory</span>
        </div>
        <div class="banner_wrapper">
          <span>* Capture a Story, Document a Memory</span>
          <span>* Capture a Story, Document a Memory</span>
          <span>* Capture a Story, Document a Memory</span>
          <span>* Capture a Story, Document a Memory</span>
          <span>* Capture a Story, Document a Memory</span>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>

<style lang="scss">
.logo {
  grid-row: 1;
  grid-column: 1;

  padding: 5vh;
  margin: var(--s_margin-top);

  color: black;
  // font-size: 2em;

  z-index: 2;
}

nav {
  grid-row: 1;
  grid-column: 4 / span 3;

  padding: 5vh;

  ul {
    display: flex;
    justify-content: space-around;
    align-items: center;

    list-style: none;

    margin-top: var(--s_margin-top);
  }
}

.home {
  grid-column: 1 / -1;
  grid-row: 1 / -1;

  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: repeat(6, 1fr);

  width: 100vw;
  height: 100vh;
}

.banner {
  grid-row: -2;
  grid-column: 1 / -1;

  display: flex;
  flex-direction: row;

  overflow: hidden;

  > div {
    position: relative;
    display: flex;
    align-items: flex-end;

    width: 100%;
    height: 100%;
  }

  &_wrapper {
    position: absolute;
    bottom: var(--s_margin-top);
    left: 0;
    white-space: nowrap;

    span {
      display: inline-block;
      font-size: 2rem;

      animation: scroll 18s linear infinite;
    }

    &:last-of-type {
      color: white;
      clip: rect(0px, 50vw, 100px, 0px);
    }
  }
}

.title {
  grid-row: 2 / span 4;
  grid-column: 1 / span 3;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 3rem;

  h1 span {
    color: #f39b6d;
  }
}

// .video,

@keyframes scroll {
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(-100%, 0, 0);
  }
}
</style>