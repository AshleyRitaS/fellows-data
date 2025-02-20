import { Geist, Geist_Mono, EB_Garamond, Lato } from "next/font/google";
import "./globals.css";
import StoreProvider from "./_components/StoreProvider";
import Head from "next/head";
import NavBar from "./_components/NavBar";

import {GoogleAnalytics} from 'next/third-parties/google';

const garamondFont = EB_Garamond({
  variable: '--font-eb-garamond',
  subsets: ['latin'],
  weight: '600',
})

const latoFont = Lato({
  subsets:['latin'],
  
  weight: '700',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FellowTools | Fellowship Tools to Level Up Your Game",
  description: "FellowTools is an unofficial site for fans of Fellowship and MMOs to make and share dungeon routes, view character abilities and talents, and more!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <StoreProvider>
          <NavBar />
          <div className="content">
            {children}
          </div>
        </StoreProvider>
        <GoogleAnalytics gaId="G-481RYS0CXG"/>
      </body>
    </html>
  );
}
