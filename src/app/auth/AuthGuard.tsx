"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const publicPaths = ["/", "/auth", "/register", "/forgot-password"];

    if (!token && !publicPaths.includes(pathname)) {
      router.push("/auth");
    } else if (token && pathname === "/") {
      router.push("/dashboard");
    } else {
      setIsAuthorized(true);
    }
  }, [router, pathname]);

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
