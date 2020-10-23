/* Este middleware comprueba antes de entrar en una pagina 
si hay un token de usuario y si no lo hay, redirige al login*/
export default function({ store, redirect }) {
  // If the user is not authenticated
  if (store.state.userToken == null) {
    return redirect("/login");
  }
}
