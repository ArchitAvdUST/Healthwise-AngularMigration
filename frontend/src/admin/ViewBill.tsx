import React, { useState } from 'react';
import AdminNavbar from './components/AdminNavBar'; // Adjust the path as necessary

const ViewBill: React.FC = () => {
  const [billItems, setBillItems] = useState([
    { id: 1, description: 'Consultation Charges', unit: 'Hour', quantity: 1, price: 200, gst: 12, amount: 224.00 },
    { id: 2, description: 'Lab Report', unit: 'Report', quantity: 1, price: 500, gst: 12, amount: 560.00 },
    { id: 3, description: 'Pharmacy', unit: 'Item', quantity: 3, price: 150, gst: 12, amount: 504.00 },
  ]);

  const [subTotal, setSubTotal] = useState(1288.00);
  const [discount, setDiscount] = useState(100.00);
  const [amountPaid, setAmountPaid] = useState(300.00);

  // Handle changes to the bill item fields
  const handleChange = (index: number, field: string, value: string | number) => {
    const updatedItems = [...billItems];
   // updatedItems[index][field] = value;

    // Calculate the amount based on quantity and price
    if (field === 'quantity' || field === 'price' || field === 'gst') {
      const quantity = updatedItems[index].quantity || 0;
      const price = updatedItems[index].price || 0;
      const gstRate = updatedItems[index].gst || 0;
      const amount = quantity * price * (1 + gstRate / 100);
      updatedItems[index].amount = parseFloat(amount.toFixed(2));
    }

    setBillItems(updatedItems);
    updateSubTotal(updatedItems);
  };

  // Calculate the subtotal based on the updated items
  const updateSubTotal = (items: any[]) => {
    const total = items.reduce((acc, item) => acc + item.amount, 0);
    setSubTotal(total);
  };

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
              {billItems.map((item, index) => (
                <tr key={item.id}>
                  <td style={{ padding: '10px', textAlign: 'center' }}>{item.id}</td>
                  <td style={{ padding: '10px' }}>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleChange(index, 'description', e.target.value)}
                      style={{ width: '100%', border: '1px solid #ddd', borderRadius: '4px', padding: '5px' }}
                    />
                  </td>
                  <td style={{ padding: '10px' }}>
                    <input
                      type="text"
                      value={item.unit}
                      onChange={(e) => handleChange(index, 'unit', e.target.value)}
                      style={{ width: '100%', border: '1px solid #ddd', borderRadius: '4px', padding: '5px' }}
                    />
                  </td>
                  <td style={{ padding: '10px' }}>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleChange(index, 'quantity', Number(e.target.value))}
                      style={{ width: '100%', border: '1px solid #ddd', borderRadius: '4px', padding: '5px' }}
                    />
                  </td>
                  <td style={{ padding: '10px' }}>
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => handleChange(index, 'price', Number(e.target.value))}
                      style={{ width: '100%', border: '1px solid #ddd', borderRadius: '4px', padding: '5px' }}
                    />
                  </td>
                  <td style={{ padding: '10px' }}>
                    <input
                      type="number"
                      value={item.gst}
                      onChange={(e) => handleChange(index, 'gst', Number(e.target.value))}
                      style={{ width: '100%', border: '1px solid #ddd', borderRadius: '4px', padding: '5px' }}
                    />
                  </td>
                  <td style={{ padding: '10px' }}>
                    <input
                      type="number"
                      value={item.amount}
                      readOnly
                      style={{ width: '100%', border: '1px solid #ddd', borderRadius: '4px', padding: '5px', backgroundColor: '#f0f0f0' }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Amount Summary */}
          <div style={{ marginTop: '20px', fontSize: '16px', textAlign: 'right' }}>
            <p>Sub Total: ₹{subTotal.toFixed(2)}</p>
            <p>Discount: ₹{discount.toFixed(2)}</p>
            <p><strong>Final Amount: ₹{(subTotal - discount).toFixed(2)}</strong></p>
            <p>Amount Paid: ₹{amountPaid.toFixed(2)}</p>
            <p><strong>Balance: ₹{(subTotal - discount - amountPaid).toFixed(2)}</strong></p>
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
