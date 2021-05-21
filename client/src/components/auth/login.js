import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { doLogin, setFetching, setSiteTitle } from '../../redux/actionCreators';

const Login = () => {
  const [fields, setFields] = useState({ username: '', password: '' });
  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    setSiteTitle(dispatch, 'Login');
  }, [dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setFetching(dispatch, true);
    doLogin(fields, dispatch);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="card-body">
        <div className="form-group">
          <label htmlFor="username">User name</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            placeholder="Enter your user name"
            onChange={handleChange}
            value={fields.username}
            required
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Enter password"
            onChange={handleChange}
            value={fields.password}
            required
          />
        </div>
      </div>
      <div className="card-footer text-muted">
        <button type="submit" className="btn btn-success">
          Login&nbsp;
        </button>
        &nbsp;
        <Link to="/auth/signup" className="btn btn-primary">
          Signup&nbsp;
        </Link>
      </div>
    </form>
  );
};

export default Login;
