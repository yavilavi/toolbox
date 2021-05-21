import React, { useState } from 'react';
import { NavLink, Link, Route } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';

import { TRIGGER_SEARCH } from '../../../redux/actionTypes';
import { doLogout } from '../../../redux/actionCreators';

const NavBar = () => {
  const userName = useSelector((state) => state.userName);
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');
  const handleChange = ({ target }) => {
    if (target.value.length === 0) {
      dispatch({
        type: TRIGGER_SEARCH,
        payload: '',
      });
    }
    setTerm(target.value);
  };
  const triggerSearch = (e) => {
    e.preventDefault();
    dispatch({
      type: TRIGGER_SEARCH,
      payload: term.toLowerCase(),
    });
  };
  const logout = (e) => {
    e.preventDefault();
    doLogout(dispatch);
  };
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Link className="navbar-brand" to="/">
        Text app
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink exact to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink exact to="/my-texts" className="nav-link">
            My texts
          </NavLink>
          <Link className="nav-link" to="#" onClick={logout}>
            Logout
          </Link>
        </Nav>
        <Nav className="mr-auto text-white">{userName}</Nav>
        <Route exact path="/my-texts">
          <Form inline onSubmit={triggerSearch}>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              value={term}
              onChange={handleChange}
            />
            <Button variant="outline-light" onClick={triggerSearch}>
              Search
            </Button>
          </Form>
        </Route>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
