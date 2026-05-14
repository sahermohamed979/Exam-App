import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactQueryProvider from "./providers/react-query-providers";
import NextAuthProvider from "./providers/next-auth-providers";
export default function provides({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <NextAuthProvider>

        {children}
      </NextAuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </ReactQueryProvider>
  );
}
