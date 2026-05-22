import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: {
    default: "DataSci Pro — Discover Top Data Science Courses",
    template: "%s | DataSci Pro",
  },
  description:
    "Compare and discover the best Data Science, AI & Machine Learning courses. Explore institutes, view placements, and launch your data career.",
  keywords: [
    "data science courses",
    "machine learning training",
    "AI courses",
    "data analytics",
    "best data science institute",
    "data science placements",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "DataSci Pro",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased min-h-screen flex flex-col">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1e293b',
                color: '#f8fafc',
                border: '1px solid #334155',
                borderRadius: '12px',
              },
              success: {
                iconTheme: { primary: '#10b981', secondary: '#f8fafc' },
              },
              error: {
                iconTheme: { primary: '#ef4444', secondary: '#f8fafc' },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
