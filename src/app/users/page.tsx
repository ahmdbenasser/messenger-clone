"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import EmptyState from "@/components/EmptyState";
const Users = () => {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session?.status === "unauthenticated") {
      router.push("/");
    }
  }, [session.status, router]);
  return (
    <div className="hidden lg:block lg:pl-80 h-full">
      <EmptyState />
    </div>
  );
};

export default Users;
