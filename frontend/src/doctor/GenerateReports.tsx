import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Grid,
} from '@mui/material';
import axios from 'axios';
import Navbar from './components/DoctorNavbar'; // Import Navbar

const GenerateReports: React.FC = () => {
  const [reportData, setReportData] = useState<any[]>([]); // Adjust the type as needed
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateReport = async () => {
    setLoading(true);
    setError(null); // Reset error before fetching

    try {
      const response = await axios.get('/api/report'); // Fetch report data from API
      setReportData(response.data); // Assuming the API returns an array of report entries
    } catch (error) {
      console.error('Error fetching report data:', error);
      setError('Failed to fetch report data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar /> 
      <Container sx={{ paddingY: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Generate Reports
        </Typography>
        <Grid container justifyContent="center" sx={{ mb: 3 }}>
          <Button
            variant="contained"
            onClick={handleGenerateReport}
            disabled={loading}
            sx={{
              backgroundColor: '#1976d2',
              color: 'white',
              '&:hover': {
                backgroundColor: '#155a8a', // Darker blue on hover
              },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate Report'}
          </Button>
        </Grid>

        {error && <Alert severity="error">{error}</Alert>}

        {reportData.length > 0 && (
          <TableContainer component={Paper} sx={{ marginTop: 2, boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Field 1</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Field 2</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Field 3</TableCell>
                  {/* Add more fields as necessary */}
                </TableRow>
              </TableHead>
              <TableBody>
                {reportData.map((report, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#f5f5f5', // Light grey on hover
                      },
                    }}
                  >
                    <TableCell>{report.field1}</TableCell>
                    <TableCell>{report.field2}</TableCell>
                    <TableCell>{report.field3}</TableCell>
                    {/* Add more cells as necessary */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </>
  );
};

export default GenerateReports;
