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
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { jwtDecode } from 'jwt-decode';

const PatientNavbar: React.FC = () => {
  const [patientName, setPatientName] = useState<string>(''); // State to hold patient name
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const commonFontSize = { fontSize: '16px' };

  // Fetch patient data from the API using Axios
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (token) {
          const decodedToken: { username: string } = jwtDecode(token);
          const username = decodedToken.username;
          const response = await axios.get(`http://localhost:5000/api/patients/${username}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setPatientName(response.data.name);
        }
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatientData();
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

  const handleUpdateProfile = () => {
    handleClose();
    navigate('/patient/update-profile');
  }

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Left side: Logo and Application Name */}
        <HealthAndSafetyIcon onClick={handleLogoClick} sx={{ cursor: 'pointer' }} />
        <Typography variant="h6" style={{ flexGrow: 1, marginLeft: 10, cursor: 'pointer' }} onClick={handleLogoClick}>
          HealthWise Pediatric Clinic
        </Typography>

        {/* Right side: Home button */}
        <Button color="inherit" onClick={() => navigate('/patient/dashboard')} style={commonFontSize}>
          Home
        </Button>

        {/* Combined Patient Name, Avatar, and Dropdown Icon */}
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <Typography variant="h6" style={{ margin: '0 10px', ...commonFontSize }}>
            {patientName}
          </Typography>
          <Avatar>
            {patientName.length >= 2
              ? `${patientName.charAt(0).toUpperCase()}${patientName.charAt(1).toUpperCase()}`
              : patientName.toUpperCase()}
          </Avatar>
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
          <MenuItem onClick={handleUpdateProfile}>Update Profile Details</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default PatientNavbar;
