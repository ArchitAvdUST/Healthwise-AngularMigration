import React from 'react';
import AdminNavbar from './components/AdminNavBar'; // Adjust the path as necessary

const ViewBill: React.FC = () => {
  return (
    <div>
      <AdminNavbar />

      <div style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: '20px', backgroundColor: '#f0f8ff' }}>
        <div style={{ maxWidth: '800px', margin: 'auto', backgroundColor: 'white', border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          {/* Title */}
          <h2 style={{ textAlign: 'center', fontSize: '24px', margin: '20px 0', color: '#008b8b' }}>Hospital Bill Book</h2>

          {/* Patient Info */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
            <div>
              <p>Patient Name: <span>Enter Name</span></p>
              <p>Address: <span>Enter Address</span></p>
              <p>Phone No.: <span>Enter Phone</span></p>
              <p>Email ID: <span>Enter Email</span></p>
              <p>GSTIN: <span>Enter GSTIN</span></p>
            </div>
            <div>
              <p>Bill No.: <span>Enter Bill No.</span></p>
              <p>Admit Date: <span>Enter Date</span></p>
              <p>Admit Till Date: <span>Enter Date</span></p>
            </div>
          </div>

          {/* Table */}
          <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#008b8b', color: 'white' }}>
                <th style={{ padding: '10px' }}>Sl. No.</th>
                <th style={{ padding: '10px' }}>Description</th>
                <th style={{ padding: '10px' }}>Unit</th>
                <th style={{ padding: '10px' }}>Quantity</th>
                <th style={{ padding: '10px' }}>Price / Unit</th>
                <th style={{ padding: '10px' }}>GST (%)</th>
                <th style={{ padding: '10px' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '10px', textAlign: 'center' }}>1</td>
                <td style={{ padding: '10px' }}>Registration Charges</td>
                <td style={{ padding: '10px' }}>Hour</td>
                <td style={{ padding: '10px' }}>1</td>
                <td style={{ padding: '10px' }}>50</td>
                <td style={{ padding: '10px' }}>12%</td>
                <td style={{ padding: '10px' }}>₹56.00</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', textAlign: 'center' }}>2</td>
                <td style={{ padding: '10px' }}>Room Rent</td>
                <td style={{ padding: '10px' }}>Hour</td>
                <td style={{ padding: '10px' }}>2</td>
                <td style={{ padding: '10px' }}>50</td>
                <td style={{ padding: '10px' }}>12%</td>
                <td style={{ padding: '10px' }}>₹134.40</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', textAlign: 'center' }}>3</td>
                <td style={{ padding: '10px' }}>Consultant Charges</td>
                <td style={{ padding: '10px' }}>Hour</td>
                <td style={{ padding: '10px' }}>2</td>
                <td style={{ padding: '10px' }}>50</td>
                <td style={{ padding: '10px' }}>12%</td>
                <td style={{ padding: '10px' }}>₹112.00</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', textAlign: 'center' }}>4</td>
                <td style={{ padding: '10px' }}>OT Charges</td>
                <td style={{ padding: '10px' }}>Hour</td>
                <td style={{ padding: '10px' }}>3</td>
                <td style={{ padding: '10px' }}>50</td>
                <td style={{ padding: '10px' }}>12%</td>
                <td style={{ padding: '10px' }}>₹168.00</td>
              </tr>
            </tbody>
          </table>

          {/* Amount Summary */}
          <div style={{ marginTop: '20px', fontSize: '16px', textAlign: 'right' }}>
            <p>Sub Total: ₹470.40</p>
            <p>Discount: ₹100.00</p>
            <p><strong>Final Amount: ₹370.40</strong></p>
            <p>Amount Paid: ₹100.00</p>
            <p><strong>Balance: ₹270.40</strong></p>
          </div>

          {/* Declaration */}
          <div style={{ textAlign: 'center', margin: '20px 0', fontSize: '14px', color: '#666' }}>
            <p>Declaration</p>
          </div>

          {/* Signature Section */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
            <div style={{ width: '45%', textAlign: 'center', fontSize: '14px', color: '#666' }}>
              <p>Client's Signature</p>
            </div>
            <div style={{ width: '45%', textAlign: 'center', fontSize: '14px', color: '#666' }}>
              <p>Business Signature</p>
            </div>
          </div>

          {/* Footer */}
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#666' }}>
            <p>Thanks for your business with us!!! Please visit us again!!!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBill;
