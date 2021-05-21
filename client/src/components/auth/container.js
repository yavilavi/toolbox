import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Signup from './signup';
import Login from './login';

const AuthContainer = () => {
  useEffect(() => {
    const root = document.getElementById('root');
    root.classList.remove('flex-column');
    root.classList.add('row');
    root.classList.add('container-fluid');
    return () => {
      root.classList.remove('row');
      root.classList.remove('container-fluid');
      root.classList.add('flex-column');
    };
  }, []);
  return (
    <div className="container h-50">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="h-50">
          <div className="card text-center">
            <div className="card-header">Register a membership</div>
            <Switch>
              <Route exact path="/auth/signup" component={Signup} />
              <Route exact path="/auth/login" component={Login} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
