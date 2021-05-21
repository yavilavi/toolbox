import React, { useEffect } from 'react';
import './App.css';
import { Route, Switch, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../../header/navbar';
import ContentContainer from '../content/ContentContainer';
import Footer from '../../footer';
import AuthContainer from '../../auth/container';
import { redirect, setAlert } from '../../../redux/actionCreators';

function App() {
  const alert = useSelector((state) => state.alert);
  const redirection = useSelector((state) => state.redirection);
  const siteTitle = useSelector((state) => state.siteTitle);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    const title = document.getElementsByTagName('title')[0];
    title.innerText = `${title.innerText.split(' - ')[0]} - ${siteTitle}`;
    if (alert.fire) {
      Swal.fire({
        title: alert.message,
        icon: alert.type,
        position: alert.position,
        showConfirmButton: false,
        timer: 2500,
      }).then(() => {
        setAlert(dispatch);
        if (redirection.should) {
          history.push(redirection.path);
          redirect(dispatch);
        }
      });
    } else if (redirection.should) {
      console.log('redir');
      history.push(redirection.path);
      redirect(dispatch);
    }
  }, [
    alert,
    alert.fire,
    alert.message,
    alert.position,
    alert.type,
    dispatch,
    history,
    redirection.path,
    redirection.should,
    siteTitle,
  ]);
  return (
    <Switch>
      <Route path="/auth">
        <AuthContainer />
      </Route>
      <Route path="/">
        <div className="w-100">
          <NavBar />
          <ContentContainer />
        </div>
        <Footer />
      </Route>
    </Switch>
  );
}

export default App;
