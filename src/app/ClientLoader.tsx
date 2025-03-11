"use client";

import PreLoader from "@/components/Common/PreLoader";
import { useState } from "react";

export default function ClientLoader({ children }: { children: React.ReactNode }) {
  const [loading, settLoading] = useState(true);

  setTimeout(() => settLoading(false), 1000);

  if (loading) return <PreLoader />;

  return (
    <>
      {children}
    </>
  );
}