import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowDropDown as ArrowDropDownIcon } from '@mui/icons-material';
import axios from 'axios';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import { jwtDecode } from 'jwt-decode';

const PharmacyNavbar: React.FC = () => {
  const [pharmacistName, setPharmacistName] = useState<string>(''); // State to hold pharmacist name
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  // Fetch pharmacist data from the API using Axios
  useEffect(() => {
    const fetchPharmacistData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (token) {
          const decodedToken: { username: string } = jwtDecode(token);
          const username = decodedToken.username;
          setPharmacistName(username);
        }
      } catch (error) {
        console.error('Error fetching pharmacist data:', error);
      }
    };

    fetchPharmacistData();
  }, []);

  // Handle dropdown menu open
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle dropdown menu close
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  // Handle navigation
  const handleLogout = () => {
    handleClose();
    sessionStorage.removeItem("token");
    console.log('Logout');
    navigate('/'); // Redirect to the login page after logout
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Left side: Logo and Application Name */}
        <LocalPharmacyIcon onClick={handleLogoClick} sx={{ cursor: 'pointer' }} />
        <Typography variant="h6" style={{ flexGrow: 1, marginLeft: 10, cursor: 'pointer' }} onClick={handleLogoClick}>
          HealthWise Pharmacy
        </Typography>

        {/* Right side: Home button */}
        <Button color="inherit" onClick={() => navigate('/pharmacy/dashboard')}>
          Home
        </Button>

        {/* Combined Pharmacist Name, Avatar, and Dropdown Icon */}
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <Typography variant="h6" style={{ margin: '0 10px' }}>
            {pharmacistName}
          </Typography>
          <Avatar />
          <IconButton onClick={handleMenuOpen} size="medium">
            <ArrowDropDownIcon />
          </IconButton>
        </div>

        {/* Menu for dropdown */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default PharmacyNavbar;
