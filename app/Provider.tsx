"use client"
import React, { useContext, useEffect } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '@/configs/fireBaseConfig'
import { AuthContext } from './_context/AuthContext'
import { redirect } from 'next/navigation'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'

const Provider = ({ children }: { children: React.ReactNode }) => {
  const[user, setUser] = React.useState<User | null>(null);
  const CreateUser = useMutation(api.user.createNewUser);
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth,async (user) => {
      console.log(user);
      if (!user) {
        redirect('/');
        return;
      }
      setUser(user);

      if (!user.email || !user.displayName || !user.photoURL) {
        console.warn("Missing user info, not creating user in DB.");
        return;
      }
      const res = await CreateUser({ 
        name: user.displayName, 
        email: user.email, 
        pictureUrl: user.photoURL  
      });
      console.log("Result: ", res);
      
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