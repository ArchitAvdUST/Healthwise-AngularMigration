import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Stack, Paper } from '@mui/material';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        navigate('/signup');
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <>
            {/* Navbar */}
            <AppBar position="static" sx={{ backgroundColor: '#1976d2'  }}>
                <Toolbar>
                    <HealthAndSafetyIcon />
                    <Typography variant="h6" sx={{ flexGrow: 1, ml: 1 }}>
                        HealthWise Hospital Management
                    </Typography>
                    <Button color="inherit" onClick={handleSignUpClick} sx={{ mr: 1 }}>Sign Up</Button>
                    <Button color="inherit" onClick={handleLoginClick}>Log In</Button>
                </Toolbar>
            </AppBar>

            {/* Hero Section */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    backgroundImage: 'url(/hospital_bg.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: '#fff',
                    filter: 'blur(5px)',
                    height: '80vh',
                    padding: '0 20px'
                }}
            >
                <Typography variant="h3" gutterBottom>
                    Welcome to HealthWise Hospital Management
                </Typography>
                <Typography variant="h6" sx={{ maxWidth: 600, mb: 4 }}>
                    Empowering healthcare providers and patients through efficient hospital management.
                </Typography>
                <Button onClick={handleSignUpClick} variant="contained" color="primary" size="large" sx={{ padding: '10px 20px' }}>
                    Get Started
                </Button>
            </Box>

            {/* Features Section */}
            <Stack
                direction="row"
                spacing={3}
                justifyContent="center"
                alignItems="stretch"
                sx={{ mt: 6, mb: 6 }}
            >
                <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', width: '100%', maxWidth: '300px' }}>
                    <Typography variant="h6">Appointment Booking</Typography>
                    <Typography variant="body2" color="textSecondary">Easily schedule and manage appointments with doctors.</Typography>
                </Paper>
                <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', width: '100%', maxWidth: '300px' }}>
                    <Typography variant="h6">Doctor Dashboard</Typography>
                    <Typography variant="body2" color="textSecondary">View and manage patient details effectively.</Typography>
                </Paper>
                <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', width: '100%', maxWidth: '300px' }}>
                    <Typography variant="h6">Patient Management</Typography>
                    <Typography variant="body2" color="textSecondary">Update patient records and view medical history.</Typography>
                </Paper>
            </Stack>

            {/* About Us Section */}
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography variant="h5" gutterBottom>About Us</Typography>
                <Typography variant="body1" color="textSecondary" sx={{ maxWidth: '600px', margin: '0 auto' }}>
                    HealthWise Hospital Management aims to streamline hospital operations, making patient management and appointment booking seamless for everyone.
                </Typography>
            </Box>
        </>
    );
};

export default LandingPage;
