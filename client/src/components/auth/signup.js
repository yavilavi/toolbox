import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { doSignup, setSiteTitle } from '../../redux/actionCreators';

const Signup = () => {
  const [fields, setFields] = useState({
    name: '',
    username: '',
    password: '',
    passwordConfirmation: '',
  });
  const dispatch = useDispatch();
  useEffect(() => {
    setSiteTitle(dispatch, 'Register a new membership');
  }, [dispatch]);
  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    doSignup(fields, dispatch);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="card-body">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Enter your name"
            onChange={handleChange}
            value={fields.name}
            required
            autoComplete="off"
          />
        </div>
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
        <div className="form-group">
          <label htmlFor="passwordConfirmation">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="passwordConfirmation"
            name="passwordConfirmation"
            placeholder="Confirm password"
            onChange={handleChange}
            value={fields.passwordConfirmation}
            required
          />
        </div>
      </div>
      <div className="card-footer text-muted">
        <button type="submit" className="btn btn-success">
          Signup&nbsp;
        </button>
        &nbsp;
        <Link to="/auth/login" className="btn btn-primary">
          Login&nbsp;
        </Link>
      </div>
    </form>
  );
};

export default Signup;
