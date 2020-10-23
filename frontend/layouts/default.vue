<template>
  <div class="bg-black text-white">
    <Navbar />
    <div class="pt-16 px-6">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  name: "Layout"
};
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Rubik", sans-serif;
}
</style>
