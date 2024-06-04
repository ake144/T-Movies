


import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { SessionProvider } from "next-auth/react";
import  authOptions  from "@/lib/auth";
import AuthProvider from '@/components/authProvider'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "T-Movies",
  description: "Watch your favorite movies and TV shows online",
};

export default  async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
      <AuthProvider>
            {children}
      </AuthProvider>
        </body>
    </html>
  );
}
