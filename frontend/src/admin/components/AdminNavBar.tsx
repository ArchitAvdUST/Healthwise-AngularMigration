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
import { ArrowDropDown as ArrowDropDownIcon, HealthAndSafety } from '@mui/icons-material';
import axios from 'axios';
import SecurityIcon from '@mui/icons-material/Security';

const AdminNavbar: React.FC = () => {
  const [adminName, setAdminName] = useState<string>(''); // State to hold admin name
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  // Fetch admin data from the API using Axios
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get('/api/admin/'); // Update this to your admin entity API endpoint
        setAdminName(response.data.name); // Assuming the API returns an object with a 'name' property
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchAdminData();
  }, []);

  // Handle dropdown menu open
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleManageUsers = (event: React.MouseEvent<HTMLElement>) => {
    handleClose();
    navigate('/admin/manage-users');
  };

  const handleViewReports = (event: React.MouseEvent<HTMLElement>) => {
    handleClose();
    navigate('/admin/view-reports');
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
    console.log('Logout');
    navigate('/'); // Redirect to the login page after logout
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Left side: Logo and Application Name */}
        <HealthAndSafety onClick={handleLogoClick} sx={{ cursor: 'pointer' }}/>
        <Typography variant="h6" style={{ flexGrow: 1, marginLeft: 10,cursor: 'pointer' }} onClick={handleLogoClick} >
          HealthWise Admin Dashboard
        </Typography>

        {/* Right side: Home button */}
        <Button color="inherit" onClick={() => navigate('/admin-dashboard')}>
          Home
        </Button>

        {/* Combined Admin Name, Avatar, and Dropdown Icon */}
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <Typography variant="h6" style={{ margin: '0 10px' }}>
            {adminName}
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
          <MenuItem onClick={handleManageUsers}>Manage Users</MenuItem>
          <MenuItem onClick={handleViewReports}>View Reports</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
