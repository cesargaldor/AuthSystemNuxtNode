const moment = require("moment");
const jwt = require("jwt-simple");

const checkToken = (req, res, next) => {
  /* Se comprueba primero si existe el token en las cabeceras. Si no existe
   se devuelve al usuario un mensaje avisando de que tiene que 
   introducirlo*/
  if (!req.headers["user-token"]) {
    return res.json({
      error:
        "You need to include the user token in the request headers in order to access the API.",
    });
  }

  /* Si incluyó el token, se saca de la cabecera y se decodifica.*/
  const userToken = req.headers["user-token"];
  let payload = {};

  try {
    payload = jwt.decode(userToken, "secretkeyword");
  } catch (error) {
    /* Si al decodificar hay errores, se le envian al usuario*/
    return res.json({
      error: "Token is incorrect",
    });
  }

  /* Igual si ha expirado.*/
  if (payload.expiredAt < moment().unix()) {
    return res.json({
      error: "Token has expired.",
    });
  }

  req.userId = payload.userId;

  next();
};

module.exports = checkToken;
