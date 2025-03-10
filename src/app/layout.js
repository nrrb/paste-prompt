import Header from './components/Header';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <title>ChatGPT Share</title>
      </head>
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
