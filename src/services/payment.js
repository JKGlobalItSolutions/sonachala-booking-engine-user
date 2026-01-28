export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const openRazorpay = async (orderId, amount, userId, onSuccess, onFailure) => {
  const scriptLoaded = await loadRazorpayScript();
  if (!scriptLoaded) {
    alert('Razorpay SDK failed to load. Are you online?');
    return;
  }

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
    amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: 'INR',
    name: 'Sonachala',
    description: 'Booking Payment',
    image: 'https://example.com/your_logo',
    order_id: orderId, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    handler: function (response) {
      alert('Payment Successful: ' + response.razorpay_payment_id);
      onSuccess(response);
    },
    prefill: {
      name: 'User Name',
      email: 'user@example.com',
      contact: '9999999999',
    },
    notes: {
      userId: userId,
      orderId: orderId,
    },
    theme: {
      color: '#3399cc',
    },
  };

  const rzp1 = new window.Razorpay(options);
  rzp1.on('payment.failed', function (response) {
    alert('Payment Failed: ' + response.error.description);
    onFailure(response.error);
  });
  rzp1.open();
};
