import Input from '../components/Input';
const LoginPage = () => {
  return (
    <div
      className="col-lg-6 offset-lg-3 col-md-8 offset-md-2"
      data-testid="login-page"
    >
      <form className="card">
        <div className="card-header">
          <h1 className="text-center">Login</h1>
        </div>
        <div className="card-body">
          <Input id="email" label="E-mail" />
          <Input id="password" label="Password" type="password" />
          <div className="text-center">
            <button className="btn btn-primary" disabled>
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
