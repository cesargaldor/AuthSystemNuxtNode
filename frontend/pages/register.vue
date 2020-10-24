<template>
  <div
    class="sm:-mt-16 lg:-mt-1 xl:-mt-16 w-full h-screen flex justify-center items-center"
  >
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
          v-model="email"
        />
        <label class="mb-2">Username</label>
        <input
          class="input-search py-2 px-2 rounded-xl mb-5 border border-gray-100 bg-black focus:outline-none focus:border-pink-400"
          type="text"
          v-model="username"
        />
        <label class="mb-2">Password</label>
        <input
          class="input-search py-2 px-2 rounded-xl mb-8 border border-gray-100 bg-black focus:outline-none focus:border-pink-400"
          type="password"
          v-model="password"
        />
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
      email: "",
      username: "",
      password: ""
    };
  },
  methods: {
    // async register() {
    //   if (this.email == "" || this.username == "" || this.password == "") {
    //     alert("Complete all the fields");
    //   } else {
    //     const params = {
    //       email: this.email,
    //       username: this.username,
    //       password: this.password
    //     };
    //     const res = await this.$store.dispatch("register", params);

    //     if (res.message == "User added succesfully") {
    //       alert(res.message);
    //       this.$router.push("/login");
    //     } else {
    //       for (let i = 0; i < res.errors.length; i++) {
    //         alert(res.errors[i].msg);
    //       }
    //     }
    //   }
    // }

    async register() {
      if (this.email == "" || this.username == "" || this.password == "") {
        alert("Complete all the fields");
      } else {
        const res = await this.$axios.$post(
          "http://localhost:9000/api/auth/register",
          {
            email: this.email,
            username: this.username,
            password: this.password
          }
        );
        if (res.message == "User added succesfully") {
          alert(res.message);
          this.$router.push("/login");
        } else if (
          res.message == "Already exists an user with that email or username"
        ) {
          alert(res.message);
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
