"use client";
import React, { useContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/configs/fireBaseConfig";
import { AuthContext } from "./_context/AuthContext";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { DbUser } from "@/lib/types";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<DbUser | null>(null);
  const [loading, setLoading] = useState(true); // <-- loading flag
  const createUser = useMutation(api.user.createNewUser);
  const router = useRouter();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setLoading(false); // auth check done
        router.push("/");
        return;
      }

      if (!firebaseUser.email || !firebaseUser.displayName || !firebaseUser.photoURL) {
        console.warn("Missing user info, not creating user in DB.");
        setLoading(false);
        return;
      }

      try {
        const res = await createUser({
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          pictureUrl: firebaseUser.photoURL,
        });
        setUser(res);
      } catch (err) {
        console.error(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unSubscribe();
  }, [createUser, router]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={true}
        disableTransitionOnChange
      >
        {children}
      </NextThemesProvider>
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};

export default Provider;
