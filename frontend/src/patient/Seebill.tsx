import React, { useState, useEffect, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { Button, Typography, Box, Container } from '@mui/material';
import axios from 'axios';

const SeeBill: React.FC = () => {
  const [billItems, setBillItems] = useState<any[]>([]);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [amountPaid, setAmountPaid] = useState<number>(0);
  const [patientName, setPatientName] = useState<string>('');
  const [billNo, setBillNo] = useState<string>('');
  const [billDate, setBillDate] = useState<string>('');
  const billRef = useRef<HTMLDivElement>(null); // Reference to the bill div

  const appointmentId = 'YOUR_APPOINTMENT_ID_HERE'; // Replace with the actual appointment ID passed from the parent or fetched

  // Fetch billing data when the component mounts or when the appointmentId changes
  useEffect(() => {
    const fetchBillData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/billings/${appointmentId}`);
        const billingData = response.data;

        // Populate the fields with fetched billing data
        setPatientName(billingData.patientName);
        setBillNo(billingData.billNo);
        setBillDate(billingData.billDate);
        setDiscount(billingData.discount);
        setAmountPaid(billingData.amountPaid);
        setBillItems(billingData.billItems);
        
        // Calculate the subtotal and total
        const subtotal = billingData.billItems.reduce((sum: number, item: any) => sum + item.amount, 0);
        setSubTotal(subtotal);
      } catch (error) {
        console.error('Error fetching billing data', error);
      }
    };

    if (appointmentId) {
      fetchBillData();
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
              <th style={{ padding: '10px', textAlign: 'center' }}>Quantity</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>Price</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>GST (%)</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {billItems.map((item) => (
              <tr key={item.id}>
                <td style={{ padding: '10px', textAlign: 'center' }}>{item.description}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{item.quantity}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>₹{item.price.toFixed(2)}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{item.gst}%</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>₹{item.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Summary */}
        <Box sx={{ textAlign: 'right', marginTop: '20px' }}>
          <Typography variant="body1">Sub Total: ₹{subTotal.toFixed(2)}</Typography>
          <Typography variant="body1">Discount: ₹{discount.toFixed(2)}</Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Final Amount: ₹{(subTotal - discount).toFixed(2)}</Typography>
          <Typography variant="body1">Amount Paid: ₹{amountPaid.toFixed(2)}</Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Balance: ₹{(subTotal - discount - amountPaid).toFixed(2)}</Typography>
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
