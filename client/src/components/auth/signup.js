import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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
    setSiteTitle(dispatch, 'Signup');
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
          />
        </div>
      </div>
      <div className="card-footer text-muted">
        <button type="submit" className="btn btn-primary">
          Submit&nbsp;
          <i className="fas fa-spinner fa-spin" />
        </button>
      </div>
    </form>
  );
};

export default Signup;
