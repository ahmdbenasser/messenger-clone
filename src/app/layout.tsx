import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";

import ToastProvider from "@/providers/ToastProvider";
import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";
export const metadata: Metadata = {
  title: "Messenger",
  description: "Messenger clone",
};

const inter = Inter({ subsets: ["latin"] });
const nunito = Nunito({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={nunito.className}>
        <AuthProvider>
          <ToastProvider />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
