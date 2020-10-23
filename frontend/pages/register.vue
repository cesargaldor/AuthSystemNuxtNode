<template>
  <div class="-mt-16 w-full h-screen flex justify-center items-center">
    <div class="sm:w-11/12 lg:w-1/3 xl:w-3/12">
      <h1 class="text-3xl text-center font-bold mb-2">
        Register for free
      </h1>
      <p class="text-sm text-center mb-6">Enhance your experience</p>
      <div class="flex flex-col">
        <label class="mb-2">Email</label>
        <input
          class="input-search py-2 px-2 rounded-xl mb-5 border border-gray-100 bg-black focus:outline-none focus:border-pink-400"
          type="text"
          v-model="user.email"
        />
        <label class="mb-2">Username</label>
        <input
          class="input-search py-2 px-2 rounded-xl mb-5 border border-gray-100 bg-black focus:outline-none focus:border-pink-400"
          type="text"
          v-model="user.username"
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
          @click="register"
          class="btn-grad py-2 focus:outline-none text-center cursor-pointer"
        >
          Register
        </button>
        <span class="py-4 text-center">or</span>
        <nuxt-link to="/login" class="btn-grad py-2 text-center"
          >Login with an existing account</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      user: {
        email: "",
        username: "",
        password: ""
      },
      errors: null
    };
  },
  methods: {
    async register() {
      if (
        this.user.email == "" ||
        this.user.username == "" ||
        this.user.password == ""
      ) {
        alert("Complete all the fields");
      } else {
        const res = await this.$store.dispatch("register", {
          email: this.user.email,
          username: this.user.username,
          password: this.user.password
        });

        if (res.message == "User added succesfully") {
          alert(res.message);
          this.$router.push("/login");
        } else {
          for (let i = 0; i < res.errors.length; i++) {
            alert(res.errors[i].msg);
          }
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
