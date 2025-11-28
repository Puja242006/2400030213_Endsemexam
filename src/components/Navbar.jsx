import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const navStyle = {
    backgroundColor: '#282c34',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>Login</Link>
      <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
      <Link to="/admin" style={linkStyle}>Admin</Link>
      <Link to="/citizen" style={linkStyle}>Citizen</Link>
      <Link to="/observer" style={linkStyle}>Observer</Link>
    </nav>
  );
};

export default Navbar;
