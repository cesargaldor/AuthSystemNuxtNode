<template>
  <div class="-mt-16 w-full h-screen flex justify-center items-center">
    <div class="sm:w-11/12 lg:w-1/3 xl:w-3/12">
      <h1 class="text-3xl text-center font-bold mb-2">Login to RateThisVid</h1>
      <p class="text-sm text-center mb-6">Access your RateThisVid account</p>
      <div class="flex flex-col">
        <label class="mb-2">Email</label>
        <input
          class="input-search py-2 px-2 rounded-xl mb-5 border border-gray-100 bg-black focus:outline-none focus:border-pink-400"
          type="text"
          v-model="user.email"
        />
        <label class="mb-2">Password</label>
        <input
          class="input-search py-2 px-2 rounded-xl mb-5 border border-gray-100 bg-black focus:outline-none focus:border-pink-400"
          type="password"
          v-model="user.password"
        />
        <div class="flex justify-end mb-5">
          <nuxt-link to="/reset">
            <span class="forgot text-xs">
              Forgot your password?
            </span>
          </nuxt-link>
        </div>
        <button
          @click="login"
          class="btn-grad py-2 focus:outline-none text-center cursor-pointer"
        >
          Login
        </button>
        <span class="py-4 text-center">or</span>
        <nuxt-link to="/register" class="btn-grad py-2 text-center"
          >Register</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
      if (this.user.email == "" || this.user.password == "") {
        alert("Complete all the fields");
      } else {
        const res = await this.$store.dispatch("login", {
          email: this.user.email,
          password: this.user.password
        });

        if (res.message == "Login succesful") {
          this.$router.push("/");
        } else {
          alert(res.message);
        }
      }
    }
  }
};
</script>

<style scoped>
p,
.forgot {
  color: #b1b0b0;
}
</style>
