"use client";
import EmptyState from "@/components/EmptyState";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ConversationsPage = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "unauthenticated") {
      router.push("/");
    }
  }, [session.status, router]);

  return (
    <div className="h-full lg:pl-80 hidden lg:block">
      <EmptyState />
    </div>
  );
};

export default ConversationsPage;
