"use client";

import LoginForm from "@/components/LoginForm";
import { UserSessionType } from "@/types/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const UserAuthentication = () => {
  const { data: session, status } = useSession() as UserSessionType;
  const router = useRouter();

  if (status === "authenticated") {
    // console.log("Current session: ", session);
    if (session?.user) {
      const userRole = session.user.role;
      router.push(`/users/${userRole}`);
    }
  } else if (status === "loading") {
    return <div>Loading...</div>;
  } else if (status === "unauthenticated") {
    // console.log("No Authenticated user session ");
    return <LoginForm />;
  }
};

export default UserAuthentication;
