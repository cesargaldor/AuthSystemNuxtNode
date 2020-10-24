const cookieparser = process.server ? require("cookieparser") : undefined;
import cookies from "js-cookie";

export const state = () => {
  return {
    userToken: null
  };
};

export const mutations = {
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

  //Accion de register (Daba fallo al pasar los datos por el payload)
  // async register({ email, username, password }) {
  //   console.log(username, email, password);
  //   const res = await this.$axios.$post(
  //     "http://localhost:9000/api/auth/register",
  //     {
  //       email: email,
  //       username: username,
  //       password: password
  //     }
  //   );
  //   return res;
  // },

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
