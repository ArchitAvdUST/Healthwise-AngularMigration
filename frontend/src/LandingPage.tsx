import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Stack, Paper, Link, IconButton } from '@mui/material';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { useNavigate } from 'react-router-dom';
import { Star } from '@mui/icons-material';
import {Facebook, Twitter, Instagram} from '@mui/icons-material';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        navigate('/signup');
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleLogoClick = () => {
        navigate('/');
    };

    function handleBookAppointment(): void {
        navigate('/login');
    }

    return (
        <>
            {/* Navbar */}
            <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
                <Toolbar>
                    <HealthAndSafetyIcon onClick={handleLogoClick} sx={{ cursor: 'pointer' }}/>
                    <Typography variant="h6" sx={{ flexGrow: 1, ml: 1, cursor: 'pointer' }} onClick={handleLogoClick}>
                        HealthWise Pediatrics Clinic
                    </Typography>
                    <Button color="inherit" onClick={handleSignUpClick} sx={{ mr: 1 }}>Sign Up</Button>
                    <Button color="inherit" onClick={handleLoginClick}>Log In</Button>
                </Toolbar>
            </AppBar>

            {/* Hero Section */}
            <Box
                sx={{
                    height: '500px',
                    background: 'linear-gradient(90deg, #bbdefb 0%, #b2ebf2 50%, #bbdefb 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                }}
            >
                <Container maxWidth="md">
                    <Paper
                        elevation={3}
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent grey box
                            padding: 4,
                            borderRadius: 2,
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="h3" component="h1" color="primary.main" gutterBottom>
                            Welcome to HealthWise Pediatric Clinic
                        </Typography>
                        <Typography variant="body1" color="textSecondary" paragraph>
                            Where your child's health comes first. Our team of experienced pediatricians provides
                            comprehensive care in a warm, child-friendly environment.
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={handleBookAppointment}
                            sx={{ mt: 2 }}
                        >
                            Book Appointment
                        </Button>
                    </Paper>
                </Container>
            </Box>



            {/* Features Section */}

            <Box
                sx={{
                    py: 8,
                    background: 'linear-gradient(90deg, #c1e1f5 0%, #a0d5e9 50%, #c1e1f5 100%)',
                }}
            >
                <Container maxWidth="lg">
                    <Typography
                        variant="h4"
                        component="h2"
                        color="primary.main"
                        align="center"
                        gutterBottom
                        sx={{ mb: 6 }}
                    >
                        Our Services
                    </Typography>
                    <Box
                        sx={{
                            display: 'grid',
                            gap: 4,
                            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
                            justifyContent: 'center',
                        }}
                    >
                        {[
                            {
                                title: "Preventive Care",
                                description:
                                    "Regular check-ups, vaccinations, and developmental screenings to keep your child healthy.",
                            },
                            {
                                title: "24/7 Emergency Care",
                                description:
                                    "Round-the-clock emergency services with experienced pediatric specialists.",
                            },
                            {
                                title: "Specialized Treatment",
                                description:
                                    "Expert care for complex pediatric conditions with state-of-the-art facilities.",
                            },
                        ].map((service, index) => (
                            <Paper
                                key={index}
                                elevation={3}
                                sx={{
                                    padding: 4,
                                    borderRadius: 2,
                                    textAlign: 'center',
                                    minHeight: '220px', // Extends card height
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#fff',
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 56,
                                        height: 56,
                                        backgroundColor: 'primary.main',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        mb: 2,
                                    }}
                                >
                                    <Star />
                                </Box>
                                <Typography variant="h6" color="primary.main" gutterBottom>
                                    {service.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {service.description}
                                </Typography>
                            </Paper>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* About Us Section */}
            <Box
                sx={{
                    py: 8,
                    background: 'linear-gradient(90deg, #f0e6ff 0%, #d1c4e9 50%, #f0e6ff 100%)', // Different gradient
                }}
            >
                <Container maxWidth="lg">
                    <Typography
                        variant="h4"
                        component="h2"
                        color="primary.main"
                        align="center"
                        gutterBottom
                        sx={{ mb: 6 }}
                    >
                        About Us
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        align="center"
                        sx={{ mb: 4 }}
                    >
                        Welcome to HealthWise Pediatric Clinic, where we prioritize your child's health and well-being.
                        Our team of dedicated professionals offers comprehensive care tailored to meet the unique needs
                        of your family. We believe in a child-friendly approach to healthcare, ensuring comfort and trust
                        at every visit.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => console.log('Route to About Us Page')} // Replace with routing logic
                        sx={{ display: 'block', mx: 'auto' }}
                    >
                        Learn More
                    </Button>
                </Container>
            </Box>

            

            <Box sx={{ backgroundColor: '#424242', color: 'white', py: 4 }}>
                <Container maxWidth="lg">
                    <Typography variant="h6" align="center" gutterBottom>
                        HealthWise Pediatric Clinic
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <IconButton color="inherit" aria-label="facebook" href="#">
                            <Facebook />
                        </IconButton>
                        <IconButton color="inherit" aria-label="twitter" href="#">
                            <Twitter />
                        </IconButton>
                        <IconButton color="inherit" aria-label="instagram" href="#">
                            <Instagram />
                        </IconButton>
                    </Box>
                    <Typography variant="body2" align="center">
                        © {new Date().getFullYear()} All Rights Reserved.
                    </Typography>
                </Container>
            </Box>

        </>
    );
};

export default LandingPage;

