function LoginPage() {
  return (
    <div>
      <h1>Login Page</h1>
      <p>{process.env.REACT_APP_DEV_BASE_URL}</p>
    </div>
  );
}

export default LoginPage;
