<template>
  <section class="middle">
    <div class="middle_input">
      <span>Every story need a title</span>
      <input type="text" name="title" />
    </div>
    <div class="middle_output"></div>
  </section>
</template>

<script>
export default {
  name: "middle"
};
</script>

<style lang="scss">
.middle {
  display: grid;
  grid-template-columns: 1fr 1fr;

  width: 100vw;
  height: 100vh;

  overflow: hidden;

  &_input {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    text-align: center;

    input {
      border: none;
      border-bottom: 1px solid #f39b6d;

      font-size: 1.4rem;
      text-align: center;
      outline: none;
    }
  }
}
</style>