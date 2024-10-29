import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import PatientNavbar from './components/PatientNavbar'; // Assuming Navbar is in the same directory

interface HistoryItem {
  id: string;
  date: string;
  description: string;
  doctorName: string;
}

const GetHistory: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch history data from API
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('jwtToken'); // Retrieve token from local storage
        const response = await axios.get('/api/patient/history', {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in Authorization header
          },
        });
        setHistory(response.data);
      } catch (error) {
        console.error('Error fetching history data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <>
      <PatientNavbar />

      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Medical History
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <Box
            sx={{
              display: 'flex',
              overflowX: 'auto', // Enables horizontal scrolling
              gap: 2,
              padding: 2,
            }}
          >
            {history.length > 0 ? (
              history.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    minWidth: 300,
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: 2,
                    backgroundColor: '#f9f9f9',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    flexShrink: 0,
                  }}
                >
                  <Typography variant="h6">{item.date}</Typography>
                  <Typography variant="body1" sx={{ marginTop: 1 }}>
                    {item.description}
                  </Typography>
                  <Typography variant="body2" sx={{ marginTop: 1, color: 'gray' }}>
                    Treated by Dr. {item.doctorName}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography>No history available</Typography>
            )}
          </Box>
        )}
      </Box>
    </>
  );
};

export default GetHistory;
