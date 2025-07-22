import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import "../App.css"


export default function ButtonAppBar() {

  const navigate=useNavigate()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography onClick={()=>navigate("/home")} variant="h5" component="div" 
          sx={{ flexGrow: 1 }}>
            Event Booking App
          </Typography>
          <Typography className='navbar-links' onClick={()=>navigate("/home/registerEvent")}>
            Register Events
          </Typography>
          {/* <Button color="inherit" onClick={handleLogout}>Logout</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
