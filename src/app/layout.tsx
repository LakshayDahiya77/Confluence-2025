import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { ActiveSectionProvider } from "./components/ActiveSectionContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Confluence 2025 - Cosmic Carnival",
  description: "Annual cultural fest of the college",
  // themeColor and viewport are handled via explicit meta tags in the head
  // because Next.js warns when themeColor/viewport are present in metadata export
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ backgroundColor: "#050316" }}>
      <head>
        <meta name="theme-color" content="#050316" />
        <meta name="background-color" content="#050316" />
        {/* Explicit viewport meta to replace viewport in metadata export */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            body { 
              background-color: #050316 !important; 
              background-image: url('/bg-wallpaper.jpg') !important;
              background-size: cover !important;
              background-position: center !important;
              background-repeat: no-repeat !important;
              background-attachment: fixed !important;
            }
            html { 
              background-color: #050316 !important; 
            }
            @media (max-width: 768px) {
              body {
                background-image: url('/bg-wallpaper-vertical.jpg') !important;
              }
            }
          `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          backgroundColor: "#050316",
          backgroundImage: "url('/bg-wallpaper.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <ActiveSectionProvider>
          <Navbar />
          {children}
          <Footer />
        </ActiveSectionProvider>
      </body>
    </html>
  );
}
