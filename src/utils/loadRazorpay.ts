export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }

    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const RAZORPAY_KEY_ID =
  (import.meta as any).env?.VITE_RAZORPAY_KEY_ID ||
  (typeof window !== 'undefined' ? localStorage.getItem('ruh_razorpay_key_id') : '') ||
  'rzp_live_TboRoORVhvBH1g';
