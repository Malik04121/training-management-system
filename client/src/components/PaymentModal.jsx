import React from 'react';
import  Modal  from 'react-modal';

const PaymentModal = ({ isOpen, onRequestClose, amount, onConfirm }) => {
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false} style={customStyles}>
      <div className="p-4">
        <h2 className="text-lg font-semibold">Payment Confirmation</h2>
        <p className="mt-2">You have to pay ₹ {amount} (trainer per hour rate).</p>
        <div className="mt-4 flex justify-between item-center gap-4">
          <button onClick={onConfirm} className="bg-primary w-full text-white py-2 px-4 rounded hover:bg-white hover:text-primary border hover:border-primary">
            Confirm Payment
          </button>
          <button onClick={onRequestClose} className="w-full bg-gray-300 py-2 px-4 rounded hover:bg-gray-100">
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentModal;
