<template>
  <!-- Navbar -->
  <div
    class="w-full bg-black py-3 flex items-center px-5 fixed sm:justify-between"
  >
    <!-- Div de burger menu y logo -->
    <div class="sm:w-5/12 lg:w-2/12 xl:w-2/12 flex items-center">
      <div class="pr-2">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h7"
          ></path>
        </svg>
      </div>
      <nuxt-link
        to="/"
        class="sm:hidden lg:block pl-2 uppercase title font-semibold xl:text-2xl"
      >
        Rate This Vid
      </nuxt-link>
      <nuxt-link
        to="/"
        class="sm:block lg:hidden pl-2 uppercase title text-2xl font-semibold"
      >
        RTV
      </nuxt-link>
    </div>
    <!-- Div de busqueda -->
    <div class="sm:hidden lg:block lg:w-8/12 xl:8/12 xl:-ml-16 lg:pr-3">
      <div class="flex items-center relative text-white">
        <input
          class="input-search w-full border border-gray-300 bg-black h-10 px-2 pr-16 rounded-lg text-sm focus:outline-none
          focus:border-pink-400"
          type="text"
          name="search"
          placeholder="Search"
        />
        <button type="submit" class="absolute right-0 top-0 mt-3 mr-3">
          <svg
            class="text-gray-600 h-4 w-4 fill-current"
            viewBox="0 0 56.966 56.966"
            style="enable-background:new 0 0 56.966 56.966;"
            width="512px"
            height="512px"
          >
            <path
              d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
            />
          </svg>
        </button>
      </div>
    </div>
    <!-- Div de los links -->
    <div
      class="ml-2 sm:w-7/12 lg:w-3/12 xl:w-2/12 uppercase text-sm flex items-center justify-around"
    >
      <nuxt-link
        to="/"
        class="btn-grad py-2 px-4 rounded flex items-center tracking-wider"
      >
        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          ></path></svg
        >Upload</nuxt-link
      >
      <nuxt-link to="/login" class="py-1"> Login</nuxt-link>
      <nuxt-link to="/register" class="sm:hidden lg:block py-1">
        Register</nuxt-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style>
.title {
  background: -webkit-linear-gradient(#fd856d, #e25896);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.input-search:focus {
  box-shadow: 0 0 0.01rem #fff, inset 0 0 0.01rem #fff, 0 0 1rem #e25896;
  border: 1px solid #e25896;
}

.btn-grad {
  background-image: linear-gradient(
    to right,
    #ff512f 0%,
    #dd2476 51%,
    #ff512f 100%
  );
}
.btn-grad {
  transition: 0.5s;
  background-size: 200% auto;
  border-radius: 10px;
}

.btn-grad:hover {
  background-position: right center; /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
}
</style>
