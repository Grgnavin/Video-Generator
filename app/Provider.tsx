"use client"
import React, { useContext, useEffect } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '@/configs/fireBaseConfig'
import { AuthContext } from './_context/AuthContext'
import { redirect } from 'next/navigation'

const Provider = ({ children }: { children: React.ReactNode }) => {
  const[user, setUser] = React.useState<User | null>(null);
  
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (!user) {
        redirect('/');
        return;
      }
      setUser(user);
    });
    return () => unSubscribe();
  }, [])
  
  return (
    <div>
      <AuthContext.Provider value={{user}}>
        <NextThemesProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={true}
            disableTransitionOnChange
            >
            {children}
        </NextThemesProvider>
        </AuthContext.Provider>
    </div>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
}

export default Provider