import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Container } from '@mui/material';

const PageNotFound = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/'); // Navigate to the home page
    };

    return (
        <Container style={{ textAlign: 'center', padding: '2rem' }}>
            <Typography variant="h2" color="textPrimary" gutterBottom>
                404
            </Typography>
            <Typography variant="h5" color="textSecondary" gutterBottom>
                Oops! The page you're looking for doesn't exist.
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
                It might have been moved or deleted, or you may have typed the URL incorrectly.
            </Typography>
            <Button variant="contained" color="primary" onClick={handleGoHome}>
                Go to Home
            </Button>
        </Container>
    );
};

export default PageNotFound;
