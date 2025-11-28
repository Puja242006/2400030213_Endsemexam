import React, { useState } from 'react';

import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
} from '@mui/material';

const Appshell = () => {
  const [role, setRole] = useState('faculty');

  const handleRoleChange = (newRole) => {
    setRole(newRole);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Top AppBar */}
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            Attendance Portal
          </Typography>
          <Box>
            <Button
              color={role === 'faculty' ? 'inherit' : 'secondary'}
              onClick={() => handleRoleChange('faculty')}
            >
              Faculty
            </Button>
            <Button
              color={role === 'coordinator' ? 'inherit' : 'secondary'}
              onClick={() => handleRoleChange('coordinator')}
            >
              Coordinator
            </Button>
            <Button
              color={role === 'student' ? 'inherit' : 'secondary'}
              onClick={() => handleRoleChange('student')}
            >
              Student
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Left Drawer (Sidebar) */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: 'border-box',
            marginTop: '64px',
          },
        }}
      >
        <List>
          <ListItem><ListItemText primary="Dashboard" /></ListItem>
          <ListItem><ListItemText primary="Courses" /></ListItem>
          <ListItem><ListItemText primary="Sessions" /></ListItem>
          <ListItem><ListItemText primary="Reports" /></ListItem>
          {role === 'student' && (
            <ListItem><ListItemText primary="My Attendance" /></ListItem>
          )}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          mt: 8,
          ml: '240px',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Welcome, {role.charAt(0).toUpperCase() + role.slice(1)}!
        </Typography>

        {role === 'faculty' && (
          <Typography>
            Faculty can mark and submit session-wise attendance here.
          </Typography>
        )}

        {role === 'coordinator' && (
          <Typography>
            Coordinators can view attendance summaries for all courses.
          </Typography>
        )}

        {role === 'student' && (
          <Typography>
            Students can check their personal attendance reports and warnings.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Appshell;
