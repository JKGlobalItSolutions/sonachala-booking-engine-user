import React from 'react';

const customRedColor = '#038A5E';

const CancelBookingPopup = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
            }}
        >
            <div
                style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    padding: '20px',
                    maxWidth: '400px',
                    width: '100%',
                    textAlign: 'center',
                }}
            >
                <h5 style={{ marginBottom: '15px', fontSize: '1.25rem', color: customRedColor }}>Cancel Booking</h5>
                <p style={{ marginBottom: '20px' }}>Are you sure you want to cancel this booking? This action cannot be undone.</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '4px',
                            border: 'none',
                            backgroundColor: '#f0f0f0',
                            cursor: 'pointer',
                            fontWeight: '500',
                        }}
                    >
                        No, Keep Booking
                    </button>
                    <button
                        onClick={onConfirm}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '4px',
                            border: 'none',
                            backgroundColor: customRedColor,
                            color: 'white',
                            cursor: 'pointer',
                            fontWeight: '500',
                        }}
                    >
                        Yes, Cancel Booking
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CancelBookingPopup;