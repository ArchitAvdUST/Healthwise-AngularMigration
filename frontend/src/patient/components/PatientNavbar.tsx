import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Popover,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

const PatientNavbar: React.FC = () => {
  const [patientName, setPatientName] = useState<string>(''); // State to hold patient name
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  // Fetch patient data from the API using Axios
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get('/api/patient/'); // Update this to your patient entity API endpoint
        setPatientName(response.data.name); // Assuming the API returns an object with a 'name' property
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatientData();
  }, []);

  // Handle dropdown menu open
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle dropdown menu close
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle navigation
  const handleLogout = () => {
    console.log('Logout');
    navigate('/login'); // Redirect to the login page after logout
  };

  // Determine if the Popover is open
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Left side: Logo and Application Name */}
        <HealthAndSafetyIcon />
                    <Typography variant="h6" style={{ flexGrow: 1, marginLeft: 10 }}>
                        HealthWise Hospital Management
                    </Typography>

        {/* Right side: Home button */}
        <Button color="inherit" onClick={() => navigate('/patient-dashboard')}>
          Home
        </Button>

        {/* Combined Patient Name and Avatar */}
        <div
          onMouseEnter={handleClick} // Show dropdown on hover
          onMouseLeave={handleClose} // Hide dropdown on mouse leave
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        >
          <Typography variant="h6" style={{ margin: '0 10px' }}>
            {patientName}
          </Typography>
          <Avatar />
        </div>

        {/* Popover for dropdown menu */}
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
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
          <MenuItem onClick={handleClose}>Update Profile Details</MenuItem>
          <MenuItem onClick={handleClose}>View History</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Popover>
      </Toolbar>
    </AppBar>
  );
};

export default PatientNavbar;
