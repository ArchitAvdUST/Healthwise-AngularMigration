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
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { jwtDecode } from 'jwt-decode';

const DoctorNavbar: React.FC = () => {
  const [doctorName, setDoctorName] = useState<string>(''); // State to hold doctor name
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  // Fetch doctor data from the API using Axios
  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found in session storage');
        }

        const decodedToken: { username: string } = jwtDecode(token); // Assuming username is part of the token
        const username = decodedToken.username;

        const response = await axios.get(`http://localhost:5000/api/doctors/${username}`);
        setDoctorName(response.data.name); // Assuming the API returns an object with a 'name' property
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };

    fetchDoctorData();
  }, []);

  // Handle dropdown menu open
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleManagePatients = (event: React.MouseEvent<HTMLElement>) => {
    handleClose();
    navigate('/doctor/manage-appointments');
  };

  const handleViewAppointments = (event: React.MouseEvent<HTMLElement>) => {
    handleClose();
    navigate('/doctor/view-appointments');
  };

  // Handle dropdown menu close
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle navigation
  const handleLogout = () => {
    handleClose();
    console.log('Logout');
    navigate('/login'); // Redirect to the login page after logout
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Left side: Logo and Application Name */}
        <LocalHospitalIcon />
        <Typography variant="h6" style={{ flexGrow: 1, marginLeft: 10 }}>
          HealthWise Hospital Management
        </Typography>

        {/* Right side: Home button */}
        <Button color="inherit" onClick={() => navigate('/doctor/dashboard')}>
          Home
        </Button>

        {/* Combined Doctor Name, Avatar, and Dropdown Icon */}
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <Typography variant="h6" style={{ margin: '0 10px' }}>
            {doctorName}
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
          <MenuItem onClick={handleManagePatients}>Manage Appointments</MenuItem>
          <MenuItem onClick={handleViewAppointments}>View Appointments</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default DoctorNavbar;
