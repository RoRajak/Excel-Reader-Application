import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import img from '../../public/logoBlue.svg'

import ClientSessionProvider from "@/components/ClientSessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Excel Reader",
  description: "Read Excel file",
  icons:{
    icon:img
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} dark:bg-dark-bg  bg-[#FAFAFB] `}>
      <Providers>
        <ClientSessionProvider>
        {children}
        </ClientSessionProvider>
        </Providers>
      </body>
    </html>
  );
}
