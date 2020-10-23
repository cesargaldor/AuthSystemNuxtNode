export const state = () => ({
  userToken: null,
  user: null
});

export const mutations = {
  register(state, user) {
    state.user = user;
  },

  login(state, userToken) {
    state.userToken = userToken;
  }
};

export const actions = {
  // Al abrir comprueba si hay un token en el localStorage y lo mete en el store
  checkAuth({ commit }) {
    if (process.browser) {
      if (localStorage.getItem("usertoken")) {
        commit("login", localStorage.getItem("usertoken"));
      } else {
        commit("login", null);
      }
    }
  },
  //Accion de register
  async register({ username, email, password }) {
    const res = await this.$axios.$post(
      "http://localhost:9000/api/auth/register",
      {
        username: username,
        email: email,
        password: password
      }
    );
    return res;
    //commit("register", userToken);
  },

  //Accion de login
  async login({ commit }, { email, password }) {
    const res = await this.$axios.$post(
      "http://localhost:9000/api/auth/login",
      {
        email: email,
        password: password
      }
    );

    if (res.message == "Login succesful") {
      const userToken = res.token;
      commit("login", userToken);
      localStorage.setItem("usertoken", userToken);
      return res;
    } else {
      return res;
    }
  }
};
