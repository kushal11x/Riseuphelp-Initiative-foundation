import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  type ConfirmationResult,
} from 'firebase/auth';

// RiseUpHelp Official Firebase Configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCKox_xPk9_lEzl3T4YMjZ0ik2zYD-onnE",
  authDomain: "riseuphelp-250fa.firebaseapp.com",
  projectId: "riseuphelp-250fa",
  storageBucket: "riseuphelp-250fa.firebasestorage.app",
  messagingSenderId: "174110786014",
  appId: "1:174110786014:web:bbe4aeb33392eab34c9d4f",
  measurementId: "G-N8YS35SWPS",
};

export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

if (typeof window !== 'undefined') {
  try {
    auth.useDeviceLanguage();
  } catch {
    // ignore
  }
}

export type { ConfirmationResult };
export { RecaptchaVerifier, signInWithPhoneNumber };
