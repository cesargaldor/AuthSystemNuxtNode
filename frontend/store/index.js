const cookieparser = process.server ? require("cookieparser") : undefined;
import cookies from "js-cookie";

export const state = () => {
  return {
    userToken: null
  };
  //user: null
};

export const mutations = {
  // register(state, user) {
  //   state.user = user;
  // },

  setToken(state, userToken) {
    state.userToken = userToken;
  }
};

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req.headers.cookie) {
      const token = req.headers.cookie;
      const parsed = cookieparser.parse(token);

      const tokenFinal = parsed.usertoken;
      commit("setToken", tokenFinal);
    } else {
      commit("setToken", null);
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
      commit("setToken", userToken);
      // TODO: Guardar en el state los datos del usuario al registrarse
      //localStorage.setItem("usertoken", userToken);
      return res;
    } else {
      return res;
    }
  }
};
