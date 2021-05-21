import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doLogin, setFetching, setSiteTitle } from '../../redux/actionCreators';

const Login = () => {
  const [fields, setFields] = useState({ username: '', password: '' });
  const isFetching = useSelector((state) => state.isFetching);
  // const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [submitting, setSubmitting] = useState(isFetching);
  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    setSiteTitle(dispatch, 'Login');
    setSubmitting(isFetching);
  }, [dispatch, isFetching]);
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
          />
        </div>
      </div>
      <div className="card-footer text-muted">
        <button type="submit" className="btn btn-primary">
          Submit&nbsp;
          <i className={`fas fa-spinner fa-spin ${!submitting}` ? 'd-node' : ''} />
        </button>
      </div>
    </form>
  );
};

export default Login;
