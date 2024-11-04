import React, { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { Button, Typography, Box, Container } from '@mui/material';

const SeeBill: React.FC = () => {
  const [billItems] = useState([
    { id: 1, description: 'Consultation Charges', quantity: 1, price: 200, gst: 12, amount: 224.00 },
    { id: 2, description: 'Lab Report', quantity: 1, price: 500, gst: 12, amount: 560.00 },
    { id: 3, description: 'Pharmacy', quantity: 3, price: 150, gst: 12, amount: 504.00 },
  ]);

  const [subTotal] = useState(1288.00);
  const [discount] = useState(100.00);
  const [amountPaid] = useState(300.00);
  const billRef = useRef<HTMLDivElement>(null); // Reference to the bill div

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
          <Typography variant="h6">Patient Name: <strong>John Doe</strong></Typography>
          <Typography variant="body1">Bill No.: <strong>#12345</strong></Typography>
          <Typography variant="body1">Date: <strong>2024-11-05</strong></Typography>
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
            {billItems.map(item => (
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
