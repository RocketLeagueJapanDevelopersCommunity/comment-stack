"use client";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    loadUser();
  }, [supabase.auth]);

  const handleLogin = async () => {
    await supabase.auth
      .signInWithOAuth({
        provider: "discord",
        options: {
          redirectTo: location.href,
        },
      })
      .then(() => {
        console.log("[log] Login Success!");
      })
      .catch((e) => {
        console.log("[log] ", e);
      });
  };

  const handleLogout = async () => {
    console.log("handleLogout SignOut");
    await supabase.auth
      .signOut()
      .then(() => {
        router.refresh();
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return {
    userData: user,
    handleLogin,
    handleLogout,
  };
};
