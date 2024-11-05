import React, { useState, useEffect, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { Button, Typography, Box, Container } from '@mui/material';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const SeeBill: React.FC = () => {
  const [billItems, setBillItems] = useState<any[]>([]);
  const [medicineCost, setMedicineCost] = useState<number>(0);
  const [consultationCost, setConsultationCost] = useState<number>(0);
  const [reportCost, setReportCost] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [patientName, setPatientName] = useState<string>('');
  const [patientId, setPatientId] = useState<string>('');
  const [billNo, setBillNo] = useState<string>(''); // This will be the billing ID
  const [billDate, setBillDate] = useState<string>(''); // Set today's date
  const billRef = useRef<HTMLDivElement>(null); // Reference to the bill div
  const [appointmentId, setAppointmentId] = useState<string>(''); // This should be passed to the component or fetched from URL

  // Fetch patientName using patientId
  const fetchPatientData = async (patientId: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/patients/${patientId}`);
      if (response.data.length > 0) {
        setPatientName(response.data[0].name); // Set the name from the first element
        console.log(response.data[0]); // Log the first element of the array
      } else {
        console.log('No patient data available');
      }
    } catch (error) {
      console.error('Error fetching patient data', error);
    }
  };

  // Fetch billing data using appointmentId
  const fetchBillingData = async (appointmentId: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/billings/appointment/${appointmentId}`);
      const billingData = response.data;

      setBillNo(billingData._id); // Billing ID (billNo) comes from the billing document ID
      setMedicineCost(billingData.medicinesCost);
      setConsultationCost(billingData.consultationCost);
      setReportCost(billingData.reportCost);

      // Calculate total cost
      const total = billingData.medicinesCost + billingData.consultationCost + billingData.reportCost;
      setTotalCost(total);
    } catch (error) {
      console.error('Error fetching billing data', error);
    }
  };

  // Fetch patientId and billing information based on appointmentId
  useEffect(() => {
    const fetchedAID= sessionStorage.getItem('appointmentId');
    if(fetchedAID){
      setAppointmentId(fetchedAID);
    }
    if (appointmentId) {
      // Fetch today's date
      const today = new Date().toISOString().split('T')[0]; // Format as yyyy-mm-dd
      setBillDate(today);
      const token = sessionStorage.getItem('token');
      
      // Fetch patient and billing data
      if(token){
        const decodedToken: any = jwtDecode(token);
        setPatientId(decodedToken.username);
        console.log(decodedToken.username);
      }
      // Replace the patientId with the actual one (this should be part of the billing data or fetched separately)
      fetchPatientData(patientId); // Replace with actual patientId
      fetchBillingData(appointmentId);
    }
  }, [appointmentId]);

  // Handle PDF download
  const handleDownloadPDF = () => {
    const element = billRef.current;
    if (element) {
      const options = {
        margin: 0,
        filename: 'bill.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };

      html2pdf().from(element).set(options).save();
    }
  };

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
      <Box ref={billRef} sx={{ padding: 3, border: '1px solid #ddd', borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ color: '#1976d2' }}>
          Patient Billing Information
        </Typography>

        {/* Billing Details */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h6">Patient Name: <strong>{patientName}</strong></Typography>
          <Typography variant="body1">Bill No.: <strong>{billNo}</strong></Typography>
          <Typography variant="body1">Date: <strong>{billDate}</strong></Typography>
        </Box>

        {/* Table of Bill Items */}
        <table style={{ width: '100%', marginBottom: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#1976d2', color: 'white' }}>
              <th style={{ padding: '10px', textAlign: 'center' }}>Description</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>Cost (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px', textAlign: 'center' }}>Medicines Cost</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>₹{medicineCost}</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', textAlign: 'center' }}>Consultation Cost</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>₹{consultationCost}</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', textAlign: 'center' }}>Report Cost</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>₹{reportCost}</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', textAlign: 'center' }}><strong>Total Cost</strong></td>
              <td style={{ padding: '10px', textAlign: 'center' }}><strong>₹{totalCost}</strong></td>
            </tr>
          </tbody>
        </table>

        {/* Summary */}
        <Box sx={{ textAlign: 'right', marginTop: '20px' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Final Amount: ₹{totalCost.toFixed(2)}</Typography>
        </Box>

        {/* Download Button */}
        <Box sx={{ textAlign: 'center', marginTop: '30px' }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              padding: '10px 20px',
              '&:hover': {
                backgroundColor: '#004ba0', // Darker blue on hover
              },
            }}
            onClick={handleDownloadPDF}
          >
            Download PDF
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SeeBill;
