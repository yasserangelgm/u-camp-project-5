function RegisterPage() {
  return (
    <div>
      <h1>Registro</h1>
      <form>
        <label htmlFor="name">Nombre:</label>
        <input type="text" id="name" autoComplete="off" required></input>

        <label htmlFor="lastname">Apellido:</label>
        <input type="text" id="lastname" autoComplete="off" required></input>

        <label htmlFor="email">Correo electrónico:</label>
        <input type="text" id="email" autoComplete="off" required></input>

        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          autoComplete="off"
          required
        ></input>
      </form>
    </div>
  );
}

export default RegisterPage;
