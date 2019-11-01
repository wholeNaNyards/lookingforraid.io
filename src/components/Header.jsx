import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

import './Header.css';

const Header = () => (
  <Navbar collapseOnSelect className="custom-navbar" sticky="top">
    <Navbar.Brand>
      <Link to="/">
        <em>Lfr.io</em>
      </Link>
    </Navbar.Brand>
  </Navbar>
);

export default Header;
