import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Alert,
} from '@mui/material';
import AdminNavbar from './components/AdminNavBar'; // Adjust the path as necessary

interface Review {
  id: number;
  patientName: string;
  reviewText: string;
}

const ViewReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch reviews from the API
  /*
  const fetchReviews = async () => {
    try {
      const response = await axios.get('/api/reviews'); // Adjust the endpoint as needed
      setReviews(response.data);
      setError(null); // Clear any previous error
    } catch (error) {
      setError('Failed to load reviews. Please try again.');
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);
  */

  return (
    <div>
      <AdminNavbar /> {/* Include the navbar here */}

      <Container>
        <Typography variant="h4" gutterBottom>
          Patient Reviews
        </Typography>

        {/* Error message */}
        {error && <Alert severity="error">{error}</Alert>}

        <Grid container spacing={2}>
          {reviews.map((review) => (
            <Grid item xs={12} sm={6} md={4} key={review.id}>
              <Paper elevation={3} style={{ padding: '16px' }}>
                <Typography variant="h6">{review.patientName}</Typography>
                <Typography variant="body1">{review.reviewText}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default ViewReviews;
