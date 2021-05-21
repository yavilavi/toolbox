import { Route, Switch } from 'react-router-dom';
import Card from 'react-bootstrap/card';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import TextCreate from '../../text/create/create';
import TextList from '../../text/list/list';
import TextView from '../../text/view';
import TextEdit from '../../text/edit/edit';
import NavBar from '../../header/navbar';
import Footer from '../../footer';
import { checkAuth, redirect } from '../../../redux/actionCreators';

const ContentContainer = () => {
  const siteTitle = useSelector((state) => state.siteTitle);
  const { isLoggedIn, authChecked } = useSelector((state) => state.session);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn && !authChecked) {
      checkAuth(dispatch);
    } else if (!isLoggedIn) {
      redirect(dispatch, true, '/auth/login');
    }
    return () => {
      redirect(dispatch);
    };
  }, [authChecked, dispatch, isLoggedIn]);

  return isLoggedIn ? (
    <>
      <NavBar />
      <div className="mt-3">
        <Row className="m-2">
          <div className="col-12">
            <Card className="w-100" style={{ height: '78vh' }}>
              <Card.Header>{siteTitle}</Card.Header>
              <Switch>
                <Route exact path="/" component={TextCreate} />
                <Route exact path="/my-texts" component={TextList} />
                <Route exact path="/view-text/:textId" component={TextView} />
                <Route exact path="/edit-text/:textId" component={TextEdit} />
              </Switch>
            </Card>
          </div>
        </Row>
      </div>
      <Footer />
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default ContentContainer;
