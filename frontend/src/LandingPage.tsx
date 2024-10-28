import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
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
        <Container maxWidth="lg">
            <AppBar position="static">
                <Toolbar>
                    <HealthAndSafetyIcon />
                    <Typography variant="h6" style={{ flexGrow: 1, marginLeft: 10 }}>
                        HealthWise Hospital Management
                    </Typography>
                    <Button color="inherit" onClick={handleSignUpClick}>Sign Up</Button>
                    <Button color="inherit" onClick={handleLoginClick}>Log In</Button>
                    <Button color="inherit" href="#about">About Us</Button>
                </Toolbar>
            </AppBar>

            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <Typography variant="h4">
                    Welcome to HealthWise Hospital Management
                </Typography>
            </div>
        </Container>
    );
};

export default LandingPage;
