"use client";

import { useAuth } from "@/context/AuthContext";
import PreLoader from "@/components/Common/PreLoader";

export default function ClientLoader({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();

  if (loading) return <PreLoader />;

  return (
    <>
      {children}
    </>
  );
}