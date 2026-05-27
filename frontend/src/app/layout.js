import { Playfair_Display, Lora, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/contexts/AuthContext";

/* ─── DESIGN.md Font Substitutes ───
 *  WiredDisplay → Playfair Display (serif display)
 *  BreveText    → Lora (serif body)
 *  Apercu       → Inter (sans metadata/buttons)
 */
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "700"],
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
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
    <html
      lang="en"
      className={`${playfair.variable} ${lora.variable} ${inter.variable}`}
    >
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
                background: '#000000',
                color: '#ffffff',
                border: '1px solid #000000',
                borderRadius: '0px',
                fontFamily: 'Inter, Helvetica Neue, sans-serif',
                fontSize: '14px',
                fontWeight: '700',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
