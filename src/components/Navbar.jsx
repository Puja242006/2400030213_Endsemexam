import { Dashboard, Login, Person, VisibilityOff } from '@mui/icons-material';
import React from 'react'

import { Link } from 'react-router-dom';
import Admin from '../pages/Admin';
import Citizen from '../pages/Citizen';
import Observer from '../pages/Observer';

function Navbar() {
  return (
    <nav style={{ backgroundColor: '#282c34', padding: '1rem', display: 'flex' }}>
      <Link to="/" style={linkStyle}><Login style={{ verticalAlign: 'middle', marginRight: '5px' }} />Login</Link>
      <Link to="/dashboard" style={linkStyle}><Dashboard style={{ verticalAlign: 'middle', marginRight: '5px' }} />Dashboard</Link>
      <Link to="/admin" style={linkStyle}><Admin style={{ verticalAlign: 'middle', marginRight: '5px' }} />Admin</Link>
      <Link to="/citizen" style={linkStyle}><Citizen style={{ verticalAlign: 'middle', marginRight: '5px' }} />Citizen</Link>
      <Link to="/observer" style={linkStyle}><Observer style={{ verticalAlign: 'middle', marginRight: '5px' }} />Observer</Link>
    </nav>
  )
}

// Common style for links
const linkStyle = {
  color: 'white',
  marginRight: '20px',
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  fontWeight: 'bold'
}

export default Navbar;
