"use client"
import { auth } from '@/configs/fireBaseConfig';
import { GoogleAuthProvider } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
import React from 'react'

const Auth = ({ children }: { children: React.ReactNode }) => {
  const provider = new GoogleAuthProvider();

  const onSignInClick = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (!credential) {
          console.warn('No credential returned from Google sign-in');
          return;
        }
      })
      .catch((error) => {
        // Specifically handle popup closed case
        if (error.code === 'auth/popup-closed-by-user') {
          console.log('User closed the sign-in popup');
          return;
        }
        
        // Handle other errors
        console.error('Error during sign-in:', {
          code: error.code,
          message: error.message,
          email: error.customData?.email,
          credential: GoogleAuthProvider.credentialFromError(error)
        });
      });
  }

  return (
    <div onClick={onSignInClick} style={{ cursor: 'pointer' }}>
      {children}
    </div>
  )
}

export default Auth;